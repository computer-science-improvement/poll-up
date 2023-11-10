import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSummaryToUserQuestions1699144933244
  implements MigrationInterface
{
  name = 'AddSummaryToUserQuestions1699144933244';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_question" ADD "summary" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_question" DROP COLUMN "summary"`,
    );
  }
}
