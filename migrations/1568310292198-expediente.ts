import { MigrationInterface, QueryRunner } from 'typeorm';

export class expediente1568310292198 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `
                --INSERT INTO expediente values ( 1, 1, 1 ), ( 2, 2, 2 ), ( 3,3,3 );
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
