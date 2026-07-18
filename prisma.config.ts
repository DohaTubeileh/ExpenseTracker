import type { PrismaConfig } from 'prisma';

export default {
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // Read the variable cleanly via native Node process.env
    url: process.env.DATABASE_URL,
  },
} satisfies PrismaConfig;
