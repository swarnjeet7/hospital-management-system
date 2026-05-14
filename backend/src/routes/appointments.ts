import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db.js';
import { isPrismaRecordNotFound } from '../lib/prismaErrors.js';
import { sendRouteError } from '../lib/routeErrors.js';
import { stripUndefined } from '../lib/object.js';

export const appointmentsRouter = Router();

const appointmentStatusSchema = z.enum(['scheduled', 'cancelled', 'completed']);

const createAppointmentSchema = z.object({
  patientName: z.string().trim().min(1).max(200),
  doctorName: z.string().trim().min(1).max(200),
  scheduledAt: z.coerce.date(),
  status: appointmentStatusSchema.optional(),
});

const updateAppointmentSchema = createAppointmentSchema.partial();

appointmentsRouter.get('/', async (req, res) => {
  try {
    const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
    const rows = await prisma.appointment.findMany({
      ...(q
        ? {
            where: {
              OR: [{ patientName: { contains: q } }, { doctorName: { contains: q } }],
            },
          }
        : {}),
      orderBy: { scheduledAt: 'desc' },
    });
    res.json({ data: rows });
  } catch (err) {
    sendRouteError(res, err, 'GET /appointments', 'Failed to list appointments.');
  }
});

appointmentsRouter.post('/', async (req, res) => {
  try {
    const parsed = createAppointmentSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.issues[0]?.message ?? 'Invalid body.' });
      return;
    }
    const d = parsed.data;
    const row = await prisma.appointment.create({
      data: {
        patientName: d.patientName,
        doctorName: d.doctorName,
        scheduledAt: d.scheduledAt,
        status: d.status ?? 'scheduled',
      },
    });
    res.status(201).json({ data: row });
  } catch (err) {
    sendRouteError(res, err, 'POST /appointments', 'Failed to create appointment.');
  }
});

appointmentsRouter.get('/:id', async (req, res) => {
  try {
    const row = await prisma.appointment.findUnique({ where: { id: req.params.id } });
    if (!row) {
      res.status(404).json({ message: 'Appointment not found.' });
      return;
    }
    res.json({ data: row });
  } catch (err) {
    sendRouteError(res, err, 'GET /appointments/:id', 'Failed to load appointment.');
  }
});

appointmentsRouter.patch('/:id', async (req, res) => {
  try {
    const parsed = updateAppointmentSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.issues[0]?.message ?? 'Invalid body.' });
      return;
    }
    const row = await prisma.appointment.update({
      where: { id: req.params.id },
      data: stripUndefined(parsed.data as Record<string, unknown>),
    });
    res.json({ data: row });
  } catch (err) {
    if (isPrismaRecordNotFound(err)) {
      res.status(404).json({ message: 'Appointment not found.' });
      return;
    }
    sendRouteError(res, err, 'PATCH /appointments/:id', 'Failed to update appointment.');
  }
});

appointmentsRouter.delete('/:id', async (req, res) => {
  try {
    await prisma.appointment.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    if (isPrismaRecordNotFound(err)) {
      res.status(404).json({ message: 'Appointment not found.' });
      return;
    }
    sendRouteError(res, err, 'DELETE /appointments/:id', 'Failed to delete appointment.');
  }
});
