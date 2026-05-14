export const extractApiErrorMessage = (errorPayload, fallbackMessage) => {
  const candidate =
    errorPayload?.message ||
    errorPayload?.error?.message ||
    errorPayload?.errors?.[0]?.message ||
    errorPayload?.data?.message;

  return typeof candidate === "string" && candidate.trim()
    ? candidate.trim()
    : fallbackMessage;
};

export const parseJsonSafely = async (response) => {
  try {
    return await response.json();
  } catch {
    return {};
  }
};
