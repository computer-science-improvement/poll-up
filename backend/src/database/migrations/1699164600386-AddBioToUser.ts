import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBioToUser1699164600386 implements MigrationInterface {
  name = 'AddBioToUser1699164600386';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "bio" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "bio"`);
  }
}
