import { ConfigProps, hasLogLevel } from './config.interface';

export const config = (): ConfigProps => ({
  environment: process.env.ENV_NAME,
  logLevel: hasLogLevel(process.env.LOG_LEVEL),
  scriptPath: 'scripts',
});
