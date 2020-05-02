import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { DriverService } from './driver.service';

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  public getAllDrivers() {
    return this.driverService.getAllDrivers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('free')
  public getAllFreeDrivers() {
    return this.driverService.getAllFreeDrivers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  public getDriver(@Param('id', ParseIntPipe) id: number) {
    return this.driverService.getDriver(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id/orders')
  public getDrvierOrders(@Param('id', ParseIntPipe) id: number) {
    return this.driverService.getDriverOrders(id);
  }

  @Get(':id/orders/amount')
  public getOrderAmount(@Param('id', ParseIntPipe) id: number) {
    return this.driverService.getDriverOrderAmount(id);
  }

  @Get(':id/most-often-destinations')
  public getDriverMostOftenDestiantion(@Param('id', ParseIntPipe) id: number) {
    return this.driverService.getDriverMostOftenDestinations(id);
  }

  @Get(':id/avarage-drive-time')
  public getAvarageDriveTime(@Param('id', ParseIntPipe) id: number) {
    return this.driverService.getAvarageDriveTime(id);
  }

  @Get(':id/total-income')
  public getTotalIncome(@Param('id', ParseIntPipe) id: number) {
    return this.driverService.getTotalIncome(id);
  }
}
