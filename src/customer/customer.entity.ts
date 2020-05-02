import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Expose } from 'class-transformer';
import { Order } from '../order/order.entity';

@Entity()
export class Customer {
  @Expose()
  @PrimaryGeneratedColumn()
  public id: number;

  @Expose()
  @Column({ name: 'first_name' })
  public firstName: string;

  @Expose()
  @Column({ name: 'last_name' })
  public lastName: string;

  @Expose()
  @Column({ name: 'phone_number' })
  public phoneNumber: string;

  @Expose()
  @Column({ name: 'has_active_order' })
  public hasActiveOrder: boolean;

  @OneToMany(
    () => Order,
    order => order.customer,
  )
  public orders?: Promise<Order[]>;
}
