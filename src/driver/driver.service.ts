import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Driver } from './driver.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../order/order.entity';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  public async getDriver(id: number, options?: FindOneOptions) {
    const driver = await this.driverRepository.findOne(id, options);

    if (!driver) {
      throw new HttpException('Unknown driver.', HttpStatus.NOT_FOUND);
    }

    return driver;
  }

  public getAllDrivers() {
    return this.driverRepository.find();
  }

  public async getAllFreeDrivers() {
    const drivers = await this.driverRepository.find({
      where: { hasActiveOrder: false },
    });

    if (!drivers || !drivers.length) {
      throw new HttpException('No free drivers for now.', HttpStatus.NOT_FOUND);
    }

    return drivers;
  }

  public async getDriverOrders(id: number) {
    const driver = await this.getDriver(id, {
      relations: ['orders'],
    });

    return driver.orders;
  }

  private getDriverFinsihedOrders(id: number) {
    return this.getDriverOrders(id).then(orders =>
      orders.filter(order => order.status === 'finished'),
    );
  }

  public getDriverOrderAmount(id: number) {
    return this.getDriverOrders(id).then(orders => ({ amount: orders.length }));
  }

  public getDriverMostOftenDestinations(id: number) {
    return this.driverRepository
      .createQueryBuilder()
      .from(Order, 'order')
      .select(['count(*) as amount', 'finish_point as "finishPoint"'])
      .where('driver_id = :id', { id })
      .andWhere('status = :status', { status: 'finished' })
      .groupBy('finish_point')
      .orderBy('amount')
      .getRawOne();
  }

  public async getAvarageDriveTime(id: number) {
    const finishedOrders = await this.getDriverFinsihedOrders(id);
    const totalDriveTime = finishedOrders.reduce(
      (driveTime, order) =>
        driveTime + order.finishedAt.getTime() - order.startedAt.getTime(),
      0,
    );

    return {
      avarageTime: Math.floor(totalDriveTime / finishedOrders.length / 1000),
    };
  }

  public async getTotalIncome(id: number) {
    const finishedOrders = await this.getDriverFinsihedOrders(id);
    const totalIncome = finishedOrders.reduce(
      (income, order) => income + order.price,
      0,
    );

    return { totalIncome };
  }
}
