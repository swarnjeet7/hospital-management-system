import type { ErrorRequestHandler } from 'express';

/** Malformed JSON from `express.json()` → JSON response instead of HTML. */
export const jsonParseErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  const typed = err as Error & { status?: number; type?: string };
  const msg = err instanceof Error ? err.message : String(err);
  const looksLikeJsonBody =
    err instanceof SyntaxError ||
    typed.type === 'entity.parse.failed' ||
    (typed.status === 400 && /json|parse|position/i.test(msg));

  if (looksLikeJsonBody) {
    res.status(400).json({ message: 'Invalid JSON in request body.', errorMessage: 'Invalid JSON in request body.' });
    return;
  }
  next(err);
};

export const fallbackErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({
    message: 'Unexpected server error.',
    errorMessage: 'Unexpected server error.',
  });
};
