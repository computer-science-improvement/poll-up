import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSummaryToUser1699156487932 implements MigrationInterface {
  name = 'AddSummaryToUser1699156487932';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "summary" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "summary"`);
  }
}
