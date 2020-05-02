import { MigrationInterface, QueryRunner } from 'typeorm';

export class TestDrivers1588438537608 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('driver')
      .values([
        {
          id: 1,
          firstName: 'Ashot',
          lastName: 'Ararat',
          phoneNumber: '12345',
          hasActiveOrder: true,
        },
        {
          id: 2,
          firstName: 'Shamir',
          lastName: 'Kezbek',
          phoneNumber: '5678',
          hasActiveOrder: false,
        },
        {
          id: 3,
          firstName: 'Azir',
          lastName: 'Mertenbek',
          phoneNumber: '8910',
          hasActiveOrder: false,
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.clearTable('driver');
  }
}
