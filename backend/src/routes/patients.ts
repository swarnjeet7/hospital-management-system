import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db.js';
import { isPrismaRecordNotFound } from '../lib/prismaErrors.js';
import { sendRouteError } from '../lib/routeErrors.js';
import { stripUndefined } from '../lib/object.js';

export const patientsRouter = Router();

const genderSchema = z.enum(['Male', 'Female', 'Other']);

const createPatientSchema = z.object({
  name: z.string().trim().min(1).max(200),
  age: z.coerce.number().int().min(0).max(150),
  gender: genderSchema,
  contact: z.string().trim().min(1).max(80),
  address: z.string().trim().max(2000).optional().nullable(),
});

const updatePatientSchema = createPatientSchema.partial();

patientsRouter.get('/', async (req, res) => {
  try {
    const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
    const patients = await prisma.patient.findMany({
      ...(q
        ? {
            where: {
              OR: [{ name: { contains: q } }, { contact: { contains: q } }],
            },
          }
        : {}),
      orderBy: { createdAt: 'desc' },
    });
    res.json({ data: patients });
  } catch (err) {
    sendRouteError(res, err, 'GET /patients', 'Failed to list patients.');
  }
});

patientsRouter.post('/', async (req, res) => {
  try {
    const parsed = createPatientSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.issues[0]?.message ?? 'Invalid body.' });
      return;
    }
    const d = parsed.data;
    const row = await prisma.patient.create({
      data: {
        name: d.name,
        age: d.age,
        gender: d.gender,
        contact: d.contact,
        address: d.address ?? null,
      },
    });
    res.status(201).json({ data: row });
  } catch (err) {
    sendRouteError(res, err, 'POST /patients', 'Failed to create patient.');
  }
});

patientsRouter.get('/:id', async (req, res) => {
  try {
    const row = await prisma.patient.findUnique({ where: { id: req.params.id } });
    if (!row) {
      res.status(404).json({ message: 'Patient not found.' });
      return;
    }
    res.json({ data: row });
  } catch (err) {
    sendRouteError(res, err, 'GET /patients/:id', 'Failed to load patient.');
  }
});

patientsRouter.patch('/:id', async (req, res) => {
  try {
    const parsed = updatePatientSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.issues[0]?.message ?? 'Invalid body.' });
      return;
    }
    const row = await prisma.patient.update({
      where: { id: req.params.id },
      data: stripUndefined(parsed.data as Record<string, unknown>),
    });
    res.json({ data: row });
  } catch (err) {
    if (isPrismaRecordNotFound(err)) {
      res.status(404).json({ message: 'Patient not found.' });
      return;
    }
    sendRouteError(res, err, 'PATCH /patients/:id', 'Failed to update patient.');
  }
});

patientsRouter.delete('/:id', async (req, res) => {
  try {
    await prisma.patient.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    if (isPrismaRecordNotFound(err)) {
      res.status(404).json({ message: 'Patient not found.' });
      return;
    }
    sendRouteError(res, err, 'DELETE /patients/:id', 'Failed to delete patient.');
  }
});
