import { MigrationInterface, QueryRunner } from 'typeorm';

export class movimiento1568310664354 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `
                --INSERT INTO movimiento values ( 1, 1, 1 ), ( 2, 2 , 1), ( 3, 3,2 );
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
