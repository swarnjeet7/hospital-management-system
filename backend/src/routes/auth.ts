import bcrypt from 'bcryptjs';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { env } from '../config/env.js';
import { prisma } from '../db.js';
import { isPrismaUniqueViolation } from '../lib/prismaErrors.js';
import { sendRouteError } from '../lib/routeErrors.js';

const loginBodySchema = z.object({
  email: z.string().trim().email('Invalid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

const registerRoleSchema = z.enum(['admin', 'doctor', 'nurse', 'reception_staff']);

const registerBodySchema = z.object({
  name: z.string().trim().min(1, 'Full name is required.').max(120),
  email: z.string().trim().email('Invalid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  role: registerRoleSchema,
  termsAccepted: z.boolean().refine((v) => v === true, {
    message: 'You must accept the terms and policy.',
  }),
});

export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  try {
    const parsed = registerBodySchema.safeParse(req.body);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      const message = first?.message ?? 'Invalid request body.';
      res.status(400).json({ message });
      return;
    }

    const email = parsed.data.email.toLowerCase();
    const passwordHash = await bcrypt.hash(parsed.data.password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: parsed.data.name,
        role: parsed.data.role,
      },
    });

    const token = jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      env.JWT_SECRET,
      { expiresIn: '7d' },
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    if (isPrismaUniqueViolation(err)) {
      res.status(409).json({ message: 'An account with this email already exists.' });
      return;
    }
    sendRouteError(res, err, 'POST /api/auth/register', 'Unable to create account right now.');
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const parsed = loginBodySchema.safeParse(req.body);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      const message = first?.message ?? 'Invalid request body.';
      res.status(400).json({ message });
      return;
    }

    const email = parsed.data.email.toLowerCase();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(401).json({ message: 'Invalid email or password.' });
      return;
    }

    const passwordOk = await bcrypt.compare(parsed.data.password, user.passwordHash);
    if (!passwordOk) {
      res.status(401).json({ message: 'Invalid email or password.' });
      return;
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      env.JWT_SECRET,
      { expiresIn: '7d' },
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    sendRouteError(res, err, 'POST /api/auth/login', 'Unable to sign in right now.');
  }
});
