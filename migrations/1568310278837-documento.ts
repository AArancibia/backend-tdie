import { MigrationInterface, QueryRunner } from 'typeorm';

export class documento1568310278837 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `
      INSERT INTO categoriadocumento values ( 1, 'DOCUMENTO' ), ( 2, 'EXPEDIENTE' );
      INSERT INTO tipodocumento ( idtipodocumento, nombre, abr ) values ( 1, 'Informe', 'INF' ), ( 2, 'Memorandum', 'MEMO' ), ( 3, 'Oficio', 'OFI' );
                --INSERT INTO documento values ( 1, 1 ), ( 2, 2 ), ( 3, 3 );
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
