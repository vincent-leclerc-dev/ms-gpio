import { Injectable } from '@nestjs/common';
import { spawn, spawnSync } from 'child_process';
import { ActivateGpioDto } from './ActivateGpioDto';

/**
 * ⚠️ Be careful using spawn instead of spanSync for write commands,
 * to avoid to block the node.js event loop,
 * and allow to execute other commands ex: emergency stop.
 */
@Injectable()
export class AppService {
  private readonly scriptPath = 'scripts';
  static readonly REQUEST_SENT = 'Request sent';

  /**
   * Prerequisites: pinout command must be installed on the Rapberry Pi
   */
  listJ8(): string {
    const process = spawnSync('python', [`${this.scriptPath}/list-J8.py`]);
    return JSON.parse(process.stdout.toString());
  }

  activateGpio({ gpioId, during }: ActivateGpioDto): string {
    if (typeof gpioId === 'undefined') {
      throw new Error('gpio id is missing');
    }
    if (typeof during === 'undefined') {
      throw new Error('gpio id is missing');
    }
    const process = spawn('python', [
      `${this.scriptPath}/activate-gpio.py`, gpioId, during
    ]);

    process.stdout.on('data', function (data) {
      console.log('data: ', data.toString());
      return data.toString();
    });

    process.stderr.on('data', function (data) {
      console.log('data: ', data.toString());
      return data.toString();
    });

    return AppService.REQUEST_SENT;
  }

  resetGpio(gpioId: string): string {
    if (!gpioId) {
      throw new Error('gpio id is missing');
    }
    const process = spawn('python', [`${this.scriptPath}/reset-gpio.py`, gpioId]);
    process.stdout.on('data', function (data) {
      console.log('data: ', data.toString());
      return data.toString();
    });

    process.stderr.on('data', function (data) {
      console.log('data: ', data.toString());
      return data.toString();
    });

    return AppService.REQUEST_SENT;
  }

  resetGpios(): string {
    const process = spawn('python', [`${this.scriptPath}/reset-all-gpios.py`, '0']);
    process.stdout.on('data', function (data) {
      console.log('data: ', data.toString());
      return data.toString();
    });

    process.stderr.on('data', function (data) {
      console.log('data: ', data.toString());
      return data.toString();
    });

    return AppService.REQUEST_SENT;
  }
}
