import type { PrismaConfig } from 'prisma';

export default {
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // Read the variable cleanly via native Node process.env
    url:
      process.env.DATABASE_URL ||
      `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@postgres:5432/${process.env.DB_DATABASE}?schema=public`,
  },
} satisfies PrismaConfig;
