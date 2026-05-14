import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeroPanel from "../components/auth/AuthHeroPanel";
import AuthPageShell from "../components/auth/AuthPageShell";
import LoginFormPanel from "../components/login/LoginFormPanel";
import { LOGIN_ENDPOINT } from "../config/api";
import { extractApiErrorMessage, parseJsonSafely } from "../lib/apiHttp";

const STORAGE_KEYS = {
  token: "medicore_token",
  user: "medicore_user",
};

const REQUEST_TIMEOUT_MS = 10000;

const extractLoginError = (payload) =>
  extractApiErrorMessage(payload, "Invalid email or password.");

const LOGIN_HERO_IMAGE =
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80";

export default function LoginPage() {
  const navigate = useNavigate();
  const redirectTimeoutRef = useRef(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  const persistSession = ({ token, user, remember }) => {
    const activeStorage = remember ? localStorage : sessionStorage;
    const inactiveStorage = remember ? sessionStorage : localStorage;

    inactiveStorage.removeItem(STORAGE_KEYS.token);
    inactiveStorage.removeItem(STORAGE_KEYS.user);

    activeStorage.setItem(STORAGE_KEYS.token, token);
    activeStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user ?? {}));
  };

  const loginWithApi = async (payload, signal) => {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal,
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
      }),
    });

    const data = await parseJsonSafely(response);

    if (!response.ok) {
      throw new Error(extractLoginError(data));
    }

    const token = data?.token || data?.accessToken || data?.data?.token;
    const user = data?.user || data?.data?.user || {};

    if (!token) {
      throw new Error("Login succeeded but token was not returned by API.");
    }

    return { token, user };
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }

    setIsSubmitting(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await loginWithApi(
        {
          email,
          password,
        },
        controller.signal
      );

      persistSession({
        token: response.token,
        user: response.user,
        remember: formData.remember,
      });

      setSuccessMessage("Login successful. Redirecting to dashboard...");
      redirectTimeoutRef.current = setTimeout(() => navigate("/dashboard"), 700);
    } catch (error) {
      if (error.name === "AbortError") {
        setErrorMessage("Request timed out. Please try again.");
      } else {
        setErrorMessage(error.message || "Unable to login right now.");
      }
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  return (
    <AuthPageShell
      hero={
        <AuthHeroPanel
          backgroundImageUrl={LOGIN_HERO_IMAGE}
          title="Hospital operations made easy."
          description="Centralize patient records, doctor schedules, appointments, and billing in one modern healthcare platform."
          bullets={["HIPAA-ready workflow design", "Smart appointment tracking", "Real-time admin insights"]}
        />
      }
    >
      <LoginFormPanel
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
    </AuthPageShell>
  );
}
