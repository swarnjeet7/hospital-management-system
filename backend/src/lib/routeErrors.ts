import type { Response } from 'express';
import { Prisma } from '@prisma/client';
import { isDatabaseConnectionError } from './prismaErrors.js';

const SCHEMA_HINT =
  'Database tables or columns are missing or out of date. From the backend folder run: npx prisma migrate deploy (MySQL must be running; check DATABASE_URL in .env).';

/**
 * Maps common Prisma failures to a safe JSON message for the client.
 * Call after handling domain-specific codes (e.g. P2025 not found) in the route.
 */
function jsonErr(res: Response, status: number, message: string): void {
  res.status(status).json({ message, errorMessage: message });
}

export function sendRouteError(
  res: Response,
  err: unknown,
  logLabel: string,
  fallbackMessage: string,
): void {
  if (isDatabaseConnectionError(err)) {
    jsonErr(
      res,
      503,
      'Database unavailable. Start MySQL (e.g. docker compose up -d from the project root), then run: cd backend && npx prisma migrate deploy',
    );
    return;
  }

  if (err instanceof Prisma.PrismaClientInitializationError) {
    console.error(logLabel, err);
    jsonErr(
      res,
      503,
      'Database could not be opened. Check DATABASE_URL in backend/.env and that MySQL is listening.',
    );
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2021' || err.code === 'P2022') {
      console.error(logLabel, err);
      jsonErr(res, 503, SCHEMA_HINT);
      return;
    }
  }

  console.error(logLabel, err);
  jsonErr(res, 500, fallbackMessage);
}
