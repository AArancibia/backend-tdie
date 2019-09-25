import { MigrationInterface, QueryRunner } from 'typeorm';

export class tipodocumento1568310306258 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `
                
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
