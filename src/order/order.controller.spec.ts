import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';

describe('Order Controller', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: 'OrderService', useValue: {} }],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
