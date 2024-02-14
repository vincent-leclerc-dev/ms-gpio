import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should list gpios', () => {
      const input = ['GPIO0'];

      jest.spyOn(appController, 'listGpios').mockImplementation(() => input);

      expect(appController.listGpios()).toBe(input);
    });

    it('should activate a gpio', () => {
      jest.spyOn(appController, 'activateGpio').mockImplementation(() => AppService.REQUEST_SENT);

      expect(appController.activateGpio({
        gpioId: 'GPIO0',
        during: '4'
      })).toBe(AppService.REQUEST_SENT);
    });

    it('should reset a gpio', () => {
      jest.spyOn(appController, 'resetGpio').mockImplementation(() => AppService.REQUEST_SENT);

      expect(appController.resetGpio('GPIO0')).toBe(AppService.REQUEST_SENT);
    });

    it('should reset all gpios', () => {
      jest.spyOn(appController, 'resetGpios').mockImplementation(() => AppService.REQUEST_SENT);

      expect(appController.resetGpios()).toBe(AppService.REQUEST_SENT);
    });
  });
});
