import {
  Controller,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderInput } from './order-input';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  public createOrder(@Body() orderInput: OrderInput) {
    return this.orderService.createOrder(orderInput);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  public getOrder(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getOrder(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id/start')
  public startOrder(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.startOrder(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id/finish')
  public finishOrder(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.finishOrder(id);
  }
}
