import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const authenticate: RequestHandler = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Authentication required.' });
    return;
  }

  const token = header.slice(7).trim();
  if (!token) {
    res.status(401).json({ message: 'Authentication required.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload & {
      email?: string;
      role?: string;
    };
    const sub = decoded.sub;
    if (!sub) {
      res.status(401).json({ message: 'Invalid token payload.' });
      return;
    }
    req.auth = {
      sub,
      email: decoded.email ?? '',
      role: decoded.role ?? 'admin',
    };
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};
