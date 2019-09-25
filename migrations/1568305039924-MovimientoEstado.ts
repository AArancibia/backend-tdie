import { MigrationInterface, QueryRunner } from 'typeorm';

export class MovimientoEstado1568305039924 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `
      --ALTER TABLE "movimiento_detalle_estadomovimiento" RENAME COLUMN "estadomovimientoIdestadomovimiento" TO "idestadomovimiento";
      --ALTER TABLE "movimiento_detalle_estadomovimiento" RENAME COLUMN "movimientoIdmovimiento" TO "idmovimiento";
      --ALTER TABLE "movimiento_detalle_estadomovimiento" 
      --ALTER COLUMN "fecha" SET DEFAULT now();
      `,
    );
    //ALTER TABLE "movimientoestado" RENAME COLUMN "estadomovimientoIdestadomovimiento" TO "idestadomovimiento";
    //ALTER TABLE "movimientoestado" RENAME COLUMN "movimientoIdmovimiento" TO "idmovimiento"
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `
        --ALTER TABLE "movimientoestado" RENAME COLUMN "idestadomovimiento" TO "estadomovimientoIdestadomovimiento";
        --ALTER TABLE "movimientoestado" RENAME COLUMN "idmovimiento" TO "movimientoIdmovimiento"
      `,
    );
  }
}
