import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { spawn, spawnSync } from 'child_process';
import { PinoLogger } from 'nestjs-pino';
import { ActivateGpioDto } from './ActivateGpioDto';
import { JSONObject } from './types/json';

/**
 * ⚠️ Be careful using spawn instead of spanSync for write commands,
 * to avoid to block the node.js event loop,
 * and allow to execute other commands ex: emergency stop.
 */
@Injectable()
export class AppService {
  static readonly REQUEST_SENT = 'Request sent';

  constructor(
    private readonly logger: PinoLogger,
    private readonly configService: ConfigService,
  ) {
    this.logger.setContext(AppService.name);
  }

  /**
   * Prerequisites: pinout command must be installed on the device
   */
  listJ8(): JSONObject {
    this.logger.debug('listJ8');

    const childProcess = spawnSync('python', [
      `${this.configService.get('scriptPath')}/list-J8.py`,
    ]);

    return JSON.parse(childProcess.stdout.toString());
  }

  activateGpio({ gpioId, during }: ActivateGpioDto): string {
    this.logger.debug('activateGpio', { gpioId, during });

    if (typeof gpioId === 'undefined') {
      throw new Error('gpio id is missing');
    }

    if (typeof during === 'undefined') {
      throw new Error('during is missing');
    }

    const childProcess = spawn('python', [
      `${this.configService.get('scriptPath')}/activate-gpio.py`,
      gpioId,
      `-t ${during}`,
    ]);

    childProcess.stdout.on('data', function (data: Buffer) {
      new PinoLogger({ pinoHttp: {} }).trace(data.toString());
      return data.toString();
    });

    childProcess.stderr.on('data', function (data: Buffer) {
      new PinoLogger({ pinoHttp: {} }).error(data.toString());
      return data.toString();
    });

    return AppService.REQUEST_SENT;
  }

  resetGpio(gpioId: string): string {
    this.logger.debug(`resetGpio ${gpioId}`);

    if (!gpioId) {
      throw new Error('gpio id is missing');
    }

    const childProcess = spawn('python', [
      `${this.configService.get('scriptPath')}/reset-gpio.py`,
      gpioId,
    ]);

    childProcess.stdout.on('data', function (data: Buffer) {
      new PinoLogger({ pinoHttp: {} }).trace(data.toString());
      return data.toString();
    });

    childProcess.stderr.on('data', function (data: Buffer) {
      new PinoLogger({ pinoHttp: {} }).error(data.toString());
      return data.toString();
    });

    return AppService.REQUEST_SENT;
  }

  resetGpios(): string {
    this.logger.debug('resetGpios');

    const childProcess = spawn('python', [
      `${this.configService.get('scriptPath')}/reset-all-gpios.py`,
    ]);

    childProcess.stdout.on('data', function (data: Buffer) {
      new PinoLogger({ pinoHttp: {} }).trace(data.toString());
      return data.toString();
    });

    childProcess.stderr.on('data', function (data: Buffer) {
      new PinoLogger({ pinoHttp: {} }).error(data.toString());
      return data.toString();
    });

    return AppService.REQUEST_SENT;
  }
}
