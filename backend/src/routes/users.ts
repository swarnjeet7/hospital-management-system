import bcrypt from 'bcryptjs';
import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db.js';
import { isPrismaRecordNotFound, isPrismaUniqueViolation } from '../lib/prismaErrors.js';
import { sendRouteError } from '../lib/routeErrors.js';
import { stripUndefined } from '../lib/object.js';

function requireUserId(req: Request, res: Response): string | null {
  const id = req.auth?.sub;
  if (!id) {
    res.status(401).json({ message: 'Unauthenticated.' });
    return null;
  }
  return id;
}

export const usersRouter = Router();

const userSelectPublic = {
  id: true,
  email: true,
  name: true,
  role: true,
  phone: true,
  accountStatus: true,
  createdAt: true,
  updatedAt: true,
} as const;

const roleSchema = z.enum(['admin', 'doctor', 'nurse', 'reception_staff']);
const accountStatusSchema = z.enum(['active', 'suspended']);

const createUserSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email(),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  role: roleSchema,
  accountStatus: accountStatusSchema.optional(),
});

const patchUserSchema = z.object({
  name: z.string().trim().min(1).max(120).optional(),
  role: roleSchema.optional(),
  accountStatus: accountStatusSchema.optional(),
  phone: z.string().trim().max(80).optional().nullable(),
});

const patchMeSchema = z.object({
  name: z.string().trim().min(1).max(120).optional(),
  phone: z.string().trim().max(80).optional().nullable(),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8, 'New password must be at least 8 characters.'),
});

usersRouter.get('/me', async (req, res) => {
  try {
    const sub = requireUserId(req, res);
    if (!sub) return;

    const user = await prisma.user.findUnique({
      where: { id: sub },
      select: userSelectPublic,
    });
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }
    res.json({ data: user });
  } catch (err) {
    sendRouteError(res, err, 'GET /users/me', 'Failed to load profile.');
  }
});

usersRouter.patch('/me', async (req, res) => {
  try {
    const sub = requireUserId(req, res);
    if (!sub) return;

    const parsed = patchMeSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.issues[0]?.message ?? 'Invalid body.' });
      return;
    }
    const user = await prisma.user.update({
      where: { id: sub },
      data: stripUndefined(parsed.data as Record<string, unknown>),
      select: userSelectPublic,
    });
    res.json({ data: user });
  } catch (err) {
    if (isPrismaRecordNotFound(err)) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }
    sendRouteError(res, err, 'PATCH /users/me', 'Failed to update profile.');
  }
});

usersRouter.post('/me/password', async (req, res) => {
  try {
    const sub = requireUserId(req, res);
    if (!sub) return;

    const parsed = changePasswordSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.issues[0]?.message ?? 'Invalid body.' });
      return;
    }
    const user = await prisma.user.findUnique({ where: { id: sub } });
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }
    const ok = await bcrypt.compare(parsed.data.currentPassword, user.passwordHash);
    if (!ok) {
      res.status(400).json({ message: 'Current password is incorrect.' });
      return;
    }
    const passwordHash = await bcrypt.hash(parsed.data.newPassword, 12);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    });
    res.json({ message: 'Password updated.' });
  } catch (err) {
    sendRouteError(res, err, 'POST /users/me/password', 'Failed to change password.');
  }
});

usersRouter.get('/', async (_req, res) => {
  try {
    const rows = await prisma.user.findMany({
      select: userSelectPublic,
      orderBy: { createdAt: 'desc' },
    });
    res.json({ data: rows });
  } catch (err) {
    sendRouteError(res, err, 'GET /users', 'Failed to list users.');
  }
});

usersRouter.post('/', async (req, res) => {
  try {
    const parsed = createUserSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.issues[0]?.message ?? 'Invalid body.' });
      return;
    }
    const email = parsed.data.email.toLowerCase();
    const passwordHash = await bcrypt.hash(parsed.data.password, 12);
    const row = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: parsed.data.name,
        role: parsed.data.role,
        accountStatus: parsed.data.accountStatus ?? 'active',
      },
      select: userSelectPublic,
    });
    res.status(201).json({ data: row });
  } catch (err) {
    if (isPrismaUniqueViolation(err)) {
      res.status(409).json({ message: 'Email already in use.' });
      return;
    }
    sendRouteError(res, err, 'POST /users', 'Failed to create user.');
  }
});

usersRouter.get('/:id', async (req, res) => {
  try {
    const row = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: userSelectPublic,
    });
    if (!row) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }
    res.json({ data: row });
  } catch (err) {
    sendRouteError(res, err, 'GET /users/:id', 'Failed to load user.');
  }
});

usersRouter.patch('/:id', async (req, res) => {
  try {
    const parsed = patchUserSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.issues[0]?.message ?? 'Invalid body.' });
      return;
    }
    const row = await prisma.user.update({
      where: { id: req.params.id },
      data: stripUndefined(parsed.data as Record<string, unknown>),
      select: userSelectPublic,
    });
    res.json({ data: row });
  } catch (err) {
    if (isPrismaRecordNotFound(err)) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }
    sendRouteError(res, err, 'PATCH /users/:id', 'Failed to update user.');
  }
});

usersRouter.delete('/:id', async (req, res) => {
  try {
    const sub = requireUserId(req, res);
    if (!sub) return;

    if (req.params.id === sub) {
      res.status(400).json({ message: 'You cannot delete your own account.' });
      return;
    }
    await prisma.user.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    if (isPrismaRecordNotFound(err)) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }
    sendRouteError(res, err, 'DELETE /users/:id', 'Failed to delete user.');
  }
});
