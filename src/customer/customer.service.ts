import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  public async getCustomer(id: number) {
    const customer = await this.customerRepository.findOne(id);

    if (!customer) {
      throw new HttpException('Unknown customer.', HttpStatus.NOT_FOUND);
    }

    return customer;
  }

  public getAllCustomers() {
    return this.customerRepository.find();
  }
}
