import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { DriverModule } from '../driver/driver.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), CustomerModule, DriverModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
