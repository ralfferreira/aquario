import { NextFunction, Request, Response } from 'express';
import { logger } from '@/infra/logger';

const requestLog = logger.child('http:request');

export function requestLogger(request: Request, response: Response, next: NextFunction) {
  const start = process.hrtime.bigint();

  response.on('finish', () => {
    const end = process.hrtime.bigint();
    const durationMs = Number(end - start) / 1_000_000;
    const metadata = {
      method: request.method,
      url: request.originalUrl,
      statusCode: response.statusCode,
      durationMs: Number(durationMs.toFixed(2)),
      userId: request.usuario?.id,
    };

    if (response.statusCode >= 500) {
      requestLog.error('Request completed with server error', metadata);
    } else if (response.statusCode >= 400) {
      requestLog.warn('Request completed with client error', metadata);
    } else {
      requestLog.info('Request completed successfully', metadata);
    }
  });

  next();
}
