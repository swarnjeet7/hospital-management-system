import bcrypt from 'bcryptjs';
import { prisma } from '../src/db.js';

const email = (process.env.SEED_ADMIN_EMAIL ?? 'admin@hospital.com').toLowerCase();
const password = process.env.SEED_ADMIN_PASSWORD ?? 'Admin@123456';
const name = process.env.SEED_ADMIN_NAME ?? 'Hospital Admin';

async function main() {
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    create: {
      email,
      passwordHash,
      name,
      role: 'admin',
    },
    update: {
      passwordHash,
      name,
    },
  });

  console.log(`Seed complete: login with ${email} / (password from SEED_ADMIN_PASSWORD or default)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
