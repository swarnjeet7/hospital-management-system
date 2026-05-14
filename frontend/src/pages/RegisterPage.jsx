import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeroPanel from "../components/auth/AuthHeroPanel";
import AuthPageShell from "../components/auth/AuthPageShell";
import RegisterFormPanel from "../components/register/RegisterFormPanel";
import { REGISTER_ENDPOINT } from "../config/api";
import { extractApiErrorMessage, parseJsonSafely } from "../lib/apiHttp";

const STORAGE_KEYS = {
  token: "medicore_token",
  user: "medicore_user",
};

const REQUEST_TIMEOUT_MS = 10000;

const extractRegisterError = (payload) =>
  extractApiErrorMessage(payload, "Unable to create account. Please try again.");

const REGISTER_HERO_IMAGE =
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80";

export default function RegisterPage() {
  const navigate = useNavigate();
  const redirectTimeoutRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "admin",
    termsAccepted: false,
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

  const persistSession = ({ token, user }) => {
    localStorage.setItem(STORAGE_KEYS.token, token);
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user ?? {}));
    sessionStorage.removeItem(STORAGE_KEYS.token);
    sessionStorage.removeItem(STORAGE_KEYS.user);
  };

  const registerWithApi = async (payload, signal) => {
    const response = await fetch(REGISTER_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal,
      body: JSON.stringify(payload),
    });

    const data = await parseJsonSafely(response);

    if (!response.ok) {
      throw new Error(extractRegisterError(data));
    }

    const token = data?.token || data?.accessToken || data?.data?.token;
    const user = data?.user || data?.data?.user || {};

    if (!token) {
      throw new Error("Registration succeeded but token was not returned by API.");
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

    const name = formData.fullName.trim();
    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!name || !email || !password) {
      setErrorMessage("Name, email, and password are required.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    if (!formData.termsAccepted) {
      setErrorMessage("Please accept the terms and hospital data policy.");
      return;
    }

    setIsSubmitting(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await registerWithApi(
        {
          name,
          email,
          password,
          role: formData.role,
          termsAccepted: true,
        },
        controller.signal
      );

      persistSession({
        token: response.token,
        user: response.user,
      });

      setSuccessMessage("Account created. Redirecting to dashboard...");
      redirectTimeoutRef.current = setTimeout(() => navigate("/dashboard"), 700);
    } catch (error) {
      if (error.name === "AbortError") {
        setErrorMessage("Request timed out. Please try again.");
      } else {
        setErrorMessage(error.message || "Unable to register right now.");
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
          backgroundImageUrl={REGISTER_HERO_IMAGE}
          title="Create your secure hospital workspace."
          description="Register staff and admins with role-based onboarding in a trusted healthcare environment."
          bullets={["Quick staff onboarding", "Role-based account setup", "Enterprise-grade security"]}
        />
      }
    >
      <RegisterFormPanel
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
