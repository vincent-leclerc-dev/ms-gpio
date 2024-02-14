import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ActivateGpioDto } from './ActivateGpioDto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern({ cmd: 'listJ8' })
  listJ8(): string {
    return this.appService.listJ8();
  }

  @MessagePattern({ cmd: 'activateGpio' })
  activateGpio(@Payload() dto: ActivateGpioDto): string {
    return this.appService.activateGpio(dto);
  }

  @MessagePattern({ cmd: 'resetGpio' })
  resetGpio(@Payload() gpioId: string): string {
    console.log(gpioId);
    return this.appService.resetGpio(gpioId);
  }

  @MessagePattern({ cmd: 'resetGpios' })
  resetGpios(): string {
    return this.appService.resetGpios();
  }
}
