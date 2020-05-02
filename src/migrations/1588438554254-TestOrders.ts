import { MigrationInterface, QueryRunner } from 'typeorm';

export class TestOrders1588438554254 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('order', [
        'driver_id',
        'customer_id',
        'price',
        'start_point',
        'finish_point',
        'started_at',
        'finished_at',
        'status',
      ])
      .values([
        {
          driverId: 2,
          customerId: 2,
          price: 100,
          startPoint: 'A',
          finishPoint: 'B',
          startedAt: null,
          finishedAt: null,
          status: 'pending',
        },
        {
          driverId: 1,
          customerId: 1,
          price: 102,
          startPoint: 'A',
          finishPoint: 'C',
          startedAt: '2020-04-30T18:00:00Z',
          finishedAt: null,
          status: 'started',
        },
        {
          driverId: 1,
          customerId: 2,
          price: 102,
          startPoint: 'B',
          finishPoint: 'C',
          startedAt: '2020-04-30T18:00:00Z',
          finishedAt: '2020-04-30T18:10:00Z',
          status: 'finished',
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.clearTable('order');
  }
}
