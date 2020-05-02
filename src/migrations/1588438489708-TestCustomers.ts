import { MigrationInterface, QueryRunner } from 'typeorm';

export class TestCustomers1588438489708 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('customer')
      .values([
        {
          id: 1,
          firstName: 'Anton',
          lastName: 'Ezdun',
          phoneNumber: '11111',
          hasActiveOrder: true,
        },
        {
          id: 2,
          firstName: 'Vasyl',
          lastName: 'Taxun',
          phoneNumber: '22222',
          hasActiveOrder: false,
        },
        {
          id: 3,
          firstName: 'Semen',
          lastName: 'Bigun',
          phoneNumber: '33333',
          hasActiveOrder: false,
        },
        {
          id: 4,
          firstName: 'Igor',
          lastName: 'Hodun',
          phoneNumber: '444444',
          hasActiveOrder: false,
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.clearTable('customer');
  }
}
