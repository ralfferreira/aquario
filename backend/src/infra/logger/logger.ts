import util from 'node:util';

type LogLevel = 'error' | 'warn' | 'info' | 'debug';

const levelPriority: Record<LogLevel, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

function resolveLevel(level?: string): LogLevel {
  switch ((level ?? '').toLowerCase()) {
    case 'error':
    case 'warn':
    case 'info':
    case 'debug':
      return level as LogLevel;
    default:
      return 'info';
  }
}

const defaultLevel = resolveLevel(process.env.LOG_LEVEL);

export class Logger {
  constructor(private readonly context?: string, private readonly minimumLevel: LogLevel = defaultLevel) {}

  child(childContext: string): Logger {
    const context = this.context ? `${this.context}:${childContext}` : childContext;
    return new Logger(context, this.minimumLevel);
  }

  debug(message: string, metadata?: unknown) {
    this.log('debug', message, metadata);
  }

  info(message: string, metadata?: unknown) {
    this.log('info', message, metadata);
  }

  warn(message: string, metadata?: unknown) {
    this.log('warn', message, metadata);
  }

  error(message: string, metadata?: unknown) {
    this.log('error', message, metadata);
  }

  private log(level: LogLevel, message: string, metadata?: unknown) {
    if (!this.shouldLog(level)) {
      return;
    }

    const timestamp = new Date().toISOString();
    const formattedMetadata = this.formatMetadata(metadata);
    const context = this.context ? ` [${this.context}]` : '';
    const payload = `${timestamp} ${level.toUpperCase()}${context} ${message}${formattedMetadata}`;

    const output = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log;
    output(payload);
  }

  private shouldLog(level: LogLevel) {
    return levelPriority[level] <= levelPriority[this.minimumLevel];
  }

  private formatMetadata(metadata?: unknown) {
    if (metadata === undefined || metadata === null) {
      return '';
    }

    if (metadata instanceof Error) {
      const stack = metadata.stack ?? metadata.message;
      return `\n${stack}`;
    }

    if (typeof metadata === 'string') {
      return ` ${metadata}`;
    }

    return ` ${util.inspect(metadata, { depth: null, breakLength: Infinity })}`;
  }
}

export const logger = new Logger('aquario-backend');
