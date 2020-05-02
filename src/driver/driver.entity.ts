import { Expose, Exclude } from 'class-transformer';
import { Column, PrimaryGeneratedColumn, OneToMany, Entity } from 'typeorm';
import { Order } from '../order/order.entity';

@Entity()
export class Driver {
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

  @Exclude()
  @OneToMany(
    () => Order,
    order => order.driver,
  )
  public orders?: Order[];
}
