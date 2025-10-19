import { PrismaClient } from '@prisma/client';
import { logger } from '@/infra/logger';

const prismaLogger = logger.child('prisma');

export const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

prisma.$on('warn', event => {
  prismaLogger.warn('Prisma warning', event);
});

prisma.$on('error', event => {
  prismaLogger.error('Prisma error', event);
});

prisma.$connect()
  .then(() => {
    prismaLogger.info('Conexão com o banco de dados estabelecida');
  })
  .catch(error => {
    prismaLogger.error('Falha ao conectar com o banco de dados', error);
  });
