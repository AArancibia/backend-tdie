import { MigrationInterface, QueryRunner } from 'typeorm';

export class estadomovimiento1568310336393 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `
                INSERT INTO estadomovimiento values ( 1, 'enviado' ), ( 2, 'recibido' ), ( 3, 'derivado' );
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
