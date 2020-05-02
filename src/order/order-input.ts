import { Order } from './order.entity';

export class OrderInput implements Partial<Order> {
  customerId: number;
  driverId: number;
  startPoint: string;
  finishPoint: string;
  price: number;
}
