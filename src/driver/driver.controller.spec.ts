import { Test, TestingModule } from '@nestjs/testing';
import { DriverController } from './driver.controller';

describe('Driver Controller', () => {
  let controller: DriverController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriverController],
      providers: [{ provide: 'DriverService', useValue: {} }],
    }).compile();

    controller = module.get<DriverController>(DriverController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
