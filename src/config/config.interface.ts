export enum LOG_LEVEL {
  trace = 'trace',
  debug = 'debug',
  info = 'info',
  warn = 'warn',
  error = 'error',
}

export function hasLogLevel(str: string): LOG_LEVEL {
  return Object.values(LOG_LEVEL).find((v) => v === str) || LOG_LEVEL.error;
}

export interface ConfigProps {
  environment: string;
  logLevel: LOG_LEVEL;
  scriptPath: string;
}
