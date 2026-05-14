import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import { authenticate } from './middleware/authenticate.js';
import { fallbackErrorHandler, jsonParseErrorHandler } from './middleware/httpErrors.js';
import { appointmentsRouter } from './routes/appointments.js';
import { authRouter } from './routes/auth.js';
import { doctorsRouter } from './routes/doctors.js';
import { invoicesRouter } from './routes/invoices.js';
import { patientsRouter } from './routes/patients.js';
import { reportsRouter } from './routes/reports.js';
import { usersRouter } from './routes/users.js';

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.FRONTEND_ORIGIN,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '1mb' }));
  app.use(jsonParseErrorHandler);

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.use('/api/auth', authRouter);

  app.use('/api/patients', authenticate, patientsRouter);
  app.use('/api/doctors', authenticate, doctorsRouter);
  app.use('/api/appointments', authenticate, appointmentsRouter);
  app.use('/api/invoices', authenticate, invoicesRouter);
  app.use('/api/users', authenticate, usersRouter);
  app.use('/api/reports', authenticate, reportsRouter);

  app.use((_req, res) => {
    res.status(404).json({ message: 'Not found.' });
  });

  app.use(fallbackErrorHandler);

  return app;
}
