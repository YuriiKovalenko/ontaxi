import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  public getAllCustomers() {
    return this.customerService.getAllCustomers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  public getCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.getCustomer(id);
  }
}
