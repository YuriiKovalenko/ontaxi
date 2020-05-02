import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderInput } from './order-input';
import { CustomerService } from '../customer/customer.service';
import { DriverService } from '../driver/driver.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly customerService: CustomerService,
    private readonly driverService: DriverService,
  ) {}

  public async getOrder(id: number) {
    const order = await this.orderRepository.findOne(id);

    if (!order) {
      throw new HttpException('Unknown order.', HttpStatus.NOT_FOUND);
    }

    return order;
  }

  public async createOrder(orderInput: OrderInput) {
    const order = await this.initOrder(orderInput);
    return this.orderRepository.save(order);
  }

  private async initOrder(orderInput: OrderInput) {
    const { customerId, driverId } = orderInput;
    const customer = await this.customerService.getCustomer(customerId);

    if (customer.hasActiveOrder) {
      throw new HttpException(
        'This customer has active trip.',
        HttpStatus.FORBIDDEN,
      );
    }

    const driver = await this.driverService.getDriver(driverId);

    if (driver.hasActiveOrder) {
      throw new HttpException(
        'This driver has actide order.',
        HttpStatus.FORBIDDEN,
      );
    }

    return this.orderRepository.create({
      ...orderInput,
      customer,
      driver,
      status: 'pending',
    });
  }

  public async startOrder(id: number) {
    const order = await this.getOrder(id);

    if (order.status !== 'pending') {
      throw new HttpException(
        'This order is already started or finished.',
        HttpStatus.FORBIDDEN,
      );
    }

    const customer = {
      ...order.customer,
      hasActiveOrder: true,
    };
    const driver = {
      ...order.driver,
      hasActiveOrder: true,
    };

    order.customer = customer;
    order.driver = driver;
    order.startedAt = new Date();
    order.status = 'started';

    return this.orderRepository.save(order);
  }

  public async finishOrder(id: number) {
    const order = await this.getOrder(id);

    if (order.status !== 'started') {
      throw new HttpException(
        'This order is already finished or not started.',
        HttpStatus.FORBIDDEN,
      );
    }

    const customer = {
      ...order.customer,
      hasActiveOrder: false,
    };
    const driver = {
      ...order.driver,
      hasActiveOrder: false,
    };

    order.customer = customer;
    order.driver = driver;
    order.finishedAt = new Date();
    order.status = 'finished';

    return this.orderRepository.save(order);
  }
}
