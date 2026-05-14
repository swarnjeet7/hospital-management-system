import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db.js';
import { isPrismaRecordNotFound } from '../lib/prismaErrors.js';
import { sendRouteError } from '../lib/routeErrors.js';
import { stripUndefined } from '../lib/object.js';

export const doctorsRouter = Router();

const doctorStatusSchema = z.enum(['available', 'on_leave']);

const createDoctorSchema = z.object({
  name: z.string().trim().min(1).max(200),
  specialization: z.string().trim().min(1).max(200),
  department: z.string().trim().max(200).optional().nullable(),
  contact: z.string().trim().max(80).optional().nullable(),
  timingStart: z.string().trim().max(32).optional().nullable(),
  timingEnd: z.string().trim().max(32).optional().nullable(),
  status: doctorStatusSchema.optional(),
});

const updateDoctorSchema = createDoctorSchema.partial();

doctorsRouter.get('/', async (req, res) => {
  try {
    const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
    const rows = await prisma.doctor.findMany({
      ...(q
        ? {
            where: {
              OR: [
                { name: { contains: q } },
                { specialization: { contains: q } },
                { department: { contains: q } },
              ],
            },
          }
        : {}),
      orderBy: { createdAt: 'desc' },
    });
    res.json({ data: rows });
  } catch (err) {
    sendRouteError(res, err, 'GET /doctors', 'Failed to list doctors.');
  }
});

doctorsRouter.post('/', async (req, res) => {
  try {
    const parsed = createDoctorSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.issues[0]?.message ?? 'Invalid body.' });
      return;
    }
    const d = parsed.data;
    const row = await prisma.doctor.create({
      data: {
        name: d.name,
        specialization: d.specialization,
        department: d.department ?? null,
        contact: d.contact ?? null,
        timingStart: d.timingStart ?? null,
        timingEnd: d.timingEnd ?? null,
        status: d.status ?? 'available',
      },
    });
    res.status(201).json({ data: row });
  } catch (err) {
    sendRouteError(res, err, 'POST /doctors', 'Failed to create doctor.');
  }
});

doctorsRouter.get('/:id', async (req, res) => {
  try {
    const row = await prisma.doctor.findUnique({ where: { id: req.params.id } });
    if (!row) {
      res.status(404).json({ message: 'Doctor not found.' });
      return;
    }
    res.json({ data: row });
  } catch (err) {
    sendRouteError(res, err, 'GET /doctors/:id', 'Failed to load doctor.');
  }
});

doctorsRouter.patch('/:id', async (req, res) => {
  try {
    const parsed = updateDoctorSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.issues[0]?.message ?? 'Invalid body.' });
      return;
    }
    const row = await prisma.doctor.update({
      where: { id: req.params.id },
      data: stripUndefined(parsed.data as Record<string, unknown>),
    });
    res.json({ data: row });
  } catch (err) {
    if (isPrismaRecordNotFound(err)) {
      res.status(404).json({ message: 'Doctor not found.' });
      return;
    }
    sendRouteError(res, err, 'PATCH /doctors/:id', 'Failed to update doctor.');
  }
});

doctorsRouter.delete('/:id', async (req, res) => {
  try {
    await prisma.doctor.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    if (isPrismaRecordNotFound(err)) {
      res.status(404).json({ message: 'Doctor not found.' });
      return;
    }
    sendRouteError(res, err, 'DELETE /doctors/:id', 'Failed to delete doctor.');
  }
});
