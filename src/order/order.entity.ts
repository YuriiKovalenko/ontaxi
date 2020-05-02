import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
  JoinColumn,
} from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Driver } from '../driver/driver.entity';
import { Transform, Expose } from 'class-transformer';

@Entity()
export class Order {
  @Expose()
  @PrimaryGeneratedColumn()
  public id: number;

  @Expose()
  @Column({ name: 'start_point' })
  public startPoint: string;

  @Expose()
  @Column({ name: 'finish_point' })
  public finishPoint: string;

  @Expose()
  @Column({
    name: 'started_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  public startedAt: Date;

  @Expose()
  @Column({
    name: 'finished_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  public finishedAt: Date;

  @Expose()
  @Column()
  public price: number;

  @Expose()
  @Column()
  public status: 'pending' | 'started' | 'finished';

  @Expose({ name: 'customerId' })
  @Transform(customer => customer.id)
  @ManyToOne(
    () => Customer,
    customer => customer.orders,
    { eager: true, cascade: true },
  )
  @JoinColumn({ name: 'customer_id' })
  public customer: Customer;

  @Expose({ name: 'driverId' })
  @Transform(driver => driver.id)
  @ManyToOne(
    () => Driver,
    driver => driver.orders,
    { eager: true, cascade: true },
  )
  @JoinColumn({ name: 'driver_id' })
  public driver: Driver;
}
