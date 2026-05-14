import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { prisma } from '../db.js';
import { isPrismaRecordNotFound, isPrismaUniqueViolation } from '../lib/prismaErrors.js';
import { sendRouteError } from '../lib/routeErrors.js';
import { stripUndefined } from '../lib/object.js';

export const invoicesRouter = Router();

const invoiceStatusSchema = z.enum(['paid', 'pending', 'failed']);

const createInvoiceSchema = z.object({
  invoiceNumber: z.string().trim().min(3).max(64).optional(),
  patientName: z.string().trim().min(1).max(200),
  service: z.string().trim().min(1).max(200),
  amount: z.coerce.number().positive().max(1_000_000_000),
  status: invoiceStatusSchema.optional(),
});

const updateInvoiceSchema = z.object({
  patientName: z.string().trim().min(1).max(200).optional(),
  service: z.string().trim().min(1).max(200).optional(),
  amount: z.coerce.number().positive().max(1_000_000_000).optional(),
  status: invoiceStatusSchema.optional(),
});

function nextInvoiceNumber(): string {
  return `INV-${randomUUID().replaceAll('-', '').slice(0, 10).toUpperCase()}`;
}

invoicesRouter.get('/', async (req, res) => {
  try {
    const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
    const rows = await prisma.invoice.findMany({
      ...(q
        ? {
            where: {
              OR: [
                { invoiceNumber: { contains: q } },
                { patientName: { contains: q } },
                { service: { contains: q } },
              ],
            },
          }
        : {}),
      orderBy: { createdAt: 'desc' },
    });
    res.json({ data: rows });
  } catch (err) {
    sendRouteError(res, err, 'GET /invoices', 'Failed to list invoices.');
  }
});

invoicesRouter.post('/', async (req, res) => {
  try {
    const parsed = createInvoiceSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.issues[0]?.message ?? 'Invalid body.' });
      return;
    }
    const invoiceNumber = parsed.data.invoiceNumber ?? nextInvoiceNumber();
    const row = await prisma.invoice.create({
      data: {
        invoiceNumber,
        patientName: parsed.data.patientName,
        service: parsed.data.service,
        amount: new Prisma.Decimal(parsed.data.amount),
        status: parsed.data.status ?? 'pending',
      },
    });
    res.status(201).json({ data: row });
  } catch (err) {
    if (isPrismaUniqueViolation(err)) {
      res.status(409).json({ message: 'Invoice number already exists.' });
      return;
    }
    sendRouteError(res, err, 'POST /invoices', 'Failed to create invoice.');
  }
});

invoicesRouter.get('/:id', async (req, res) => {
  try {
    const row = await prisma.invoice.findUnique({ where: { id: req.params.id } });
    if (!row) {
      res.status(404).json({ message: 'Invoice not found.' });
      return;
    }
    res.json({ data: row });
  } catch (err) {
    sendRouteError(res, err, 'GET /invoices/:id', 'Failed to load invoice.');
  }
});

invoicesRouter.patch('/:id', async (req, res) => {
  try {
    const parsed = updateInvoiceSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.issues[0]?.message ?? 'Invalid body.' });
      return;
    }
    const raw = stripUndefined(parsed.data as Record<string, unknown>);
    const data: Record<string, unknown> = { ...raw };
    if (typeof data.amount === 'number') {
      data.amount = new Prisma.Decimal(data.amount);
    }
    const row = await prisma.invoice.update({
      where: { id: req.params.id },
      data,
    });
    res.json({ data: row });
  } catch (err) {
    if (isPrismaRecordNotFound(err)) {
      res.status(404).json({ message: 'Invoice not found.' });
      return;
    }
    sendRouteError(res, err, 'PATCH /invoices/:id', 'Failed to update invoice.');
  }
});

invoicesRouter.delete('/:id', async (req, res) => {
  try {
    await prisma.invoice.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    if (isPrismaRecordNotFound(err)) {
      res.status(404).json({ message: 'Invoice not found.' });
      return;
    }
    sendRouteError(res, err, 'DELETE /invoices/:id', 'Failed to delete invoice.');
  }
});
