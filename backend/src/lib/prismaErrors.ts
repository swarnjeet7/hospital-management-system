/** Prisma / driver errors when DB is down or unreachable. */
export function isDatabaseConnectionError(err: unknown): boolean {
  if (typeof err === 'object' && err !== null && 'code' in err) {
    const code = (err as { code: string }).code;
    if (code === 'P1001' || code === 'P1000' || code === 'P1017') {
      return true;
    }
  }
  if (err instanceof Error) {
    const m = err.message;
    return (
      m.includes("Can't reach database server") ||
      m.includes('ECONNREFUSED') ||
      m.includes('connect ETIMEDOUT')
    );
  }
  return false;
}

export function isPrismaRecordNotFound(err: unknown): boolean {
  return (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    (err as { code: string }).code === 'P2025'
  );
}

export function isPrismaUniqueViolation(err: unknown): boolean {
  return (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    (err as { code: string }).code === 'P2002'
  );
}
