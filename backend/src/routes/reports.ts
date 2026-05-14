import { Router } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '../db.js';
import { sendRouteError } from '../lib/routeErrors.js';

export const reportsRouter = Router();

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function startOfLocalDay(d: Date): Date {
  const x = new Date(d.getTime());
  x.setHours(0, 0, 0, 0);
  return x;
}

function addLocalDays(d: Date, n: number): Date {
  const x = new Date(d.getTime());
  x.setDate(x.getDate() + n);
  return x;
}

function localDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

reportsRouter.get('/summary', async (_req, res) => {
  try {
    const [patients, doctors, appointments, invoicesAgg, users] = await Promise.all([
      prisma.patient.count(),
      prisma.doctor.count(),
      prisma.appointment.count(),
      prisma.invoice.aggregate({ _sum: { amount: true } }),
      prisma.user.count(),
    ]);

    const invoicesTotal = invoicesAgg._sum.amount ?? new Prisma.Decimal(0);

    res.json({
      data: {
        patients,
        doctors,
        appointments,
        users,
        invoicesTotal: invoicesTotal.toString(),
      },
    });
  } catch (err) {
    sendRouteError(res, err, 'GET /reports/summary', 'Failed to load summary.');
  }
});

reportsRouter.get('/dashboard', async (req, res) => {
  try {
    const viewerId = req.auth?.sub;
    const now = new Date();
    const todayStart = startOfLocalDay(now);
    const tomorrowStart = addLocalDays(todayStart, 1);
    const intakeRangeStart = addLocalDays(todayStart, -6);

    const [
      patients,
      doctors,
      appointmentsTotal,
      invoicesAgg,
      users,
      viewer,
      appointmentsToday,
      scheduledToday,
      pendingInvoiceCount,
      doctorsOnLeave,
      patientsInRange,
      recentPatients,
      recentAppointments,
      recentInvoices,
    ] = await Promise.all([
      prisma.patient.count(),
      prisma.doctor.count(),
      prisma.appointment.count(),
      prisma.invoice.aggregate({ _sum: { amount: true } }),
      prisma.user.count(),
      viewerId
        ? prisma.user.findUnique({
            where: { id: viewerId },
            select: { name: true, role: true },
          })
        : Promise.resolve(null),
      prisma.appointment.count({
        where: {
          scheduledAt: { gte: todayStart, lt: tomorrowStart },
        },
      }),
      prisma.appointment.count({
        where: {
          scheduledAt: { gte: todayStart, lt: tomorrowStart },
          status: 'scheduled',
        },
      }),
      prisma.invoice.count({ where: { status: 'pending' } }),
      prisma.doctor.count({ where: { status: 'on_leave' } }),
      prisma.patient.findMany({
        where: { createdAt: { gte: intakeRangeStart, lt: tomorrowStart } },
        select: { createdAt: true },
      }),
      prisma.patient.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { name: true, createdAt: true },
      }),
      prisma.appointment.findMany({
        orderBy: { updatedAt: 'desc' },
        take: 5,
        select: {
          patientName: true,
          status: true,
          scheduledAt: true,
          updatedAt: true,
        },
      }),
      prisma.invoice.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          invoiceNumber: true,
          patientName: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    const invoicesTotal = invoicesAgg._sum.amount ?? new Prisma.Decimal(0);

    const byDay = new Map<string, number>();
    for (const row of patientsInRange) {
      const k = localDateKey(row.createdAt);
      byDay.set(k, (byDay.get(k) ?? 0) + 1);
    }

    const patientIntakeLast7Days: Array<{ date: string; weekday: string; count: number }> = [];
    for (let i = 0; i < 7; i++) {
      const d = addLocalDays(intakeRangeStart, i);
      const key = localDateKey(d);
      patientIntakeLast7Days.push({
        date: key,
        weekday: WEEKDAYS[d.getDay()] ?? '—',
        count: byDay.get(key) ?? 0,
      });
    }

    type ActivityRow = { text: string; at: string };
    const activity: ActivityRow[] = [];

    for (const p of recentPatients) {
      activity.push({
        text: `New patient registered: ${p.name}.`,
        at: p.createdAt.toISOString(),
      });
    }
    for (const a of recentAppointments) {
      const when = a.scheduledAt.toISOString().slice(0, 16).replace('T', ' ');
      activity.push({
        text: `${a.patientName} — appointment ${a.status} (${when}).`,
        at: a.updatedAt.toISOString(),
      });
    }
    for (const inv of recentInvoices) {
      activity.push({
        text: `Invoice #${inv.invoiceNumber} for ${inv.patientName} (${inv.status}).`,
        at: inv.createdAt.toISOString(),
      });
    }

    activity.sort((x, y) => (x.at < y.at ? 1 : x.at > y.at ? -1 : 0));
    const recentActivity = activity.slice(0, 8);

    const notifications: Array<{ text: string; tone: string }> = [];
    if (pendingInvoiceCount > 0) {
      notifications.push({
        text: `${pendingInvoiceCount} invoice(s) pending payment.`,
        tone: 'bg-emerald-50',
      });
    }
    if (doctorsOnLeave > 0) {
      notifications.push({
        text: `${doctorsOnLeave} doctor(s) currently on leave.`,
        tone: 'bg-cyan-50',
      });
    }
    if (scheduledToday > 0) {
      notifications.push({
        text: `${scheduledToday} appointment(s) still scheduled for today.`,
        tone: 'bg-slate-50',
      });
    }
    if (notifications.length === 0) {
      notifications.push({
        text: 'No urgent alerts. All queues look clear.',
        tone: 'bg-slate-50',
      });
    }

    const capacity = Math.max(doctors * 8, 1);
    const loadPercent = Math.min(100, Math.round((appointmentsToday / capacity) * 100));

    res.json({
      data: {
        summary: {
          patients,
          doctors,
          appointments: appointmentsTotal,
          users,
          invoicesTotal: invoicesTotal.toString(),
        },
        viewer: viewer ? { name: viewer.name, role: viewer.role } : null,
        appointmentsToday,
        scheduledAppointmentsToday: scheduledToday,
        pendingInvoiceCount,
        doctorsOnLeave,
        patientIntakeLast7Days,
        notifications,
        recentActivity,
        sidebar: {
          loadPercent,
          appointmentsToday,
          pendingInvoiceCount,
        },
      },
    });
  } catch (err) {
    sendRouteError(res, err, 'GET /reports/dashboard', 'Failed to load dashboard.');
  }
});
