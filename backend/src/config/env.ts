import 'dotenv/config';
import { z } from 'zod';
import { logger } from '@/infra/logger';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3001),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET must be provided'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  logger.error('Invalid environment variables', parsedEnv.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

logger.debug('Environment variables successfully validated', {
  nodeEnv: parsedEnv.data.NODE_ENV,
  port: parsedEnv.data.PORT,
});

export const env = parsedEnv.data;
