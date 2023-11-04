import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserAndUserQuestionTable1699128204637 implements MigrationInterface {
    name = 'CreateUserAndUserQuestionTable1699128204637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "age" integer NOT NULL, "position" character varying NOT NULL, "hobbies" character varying NOT NULL, "experience" integer NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_question" ("id" SERIAL NOT NULL, "question" character varying NOT NULL, "answer" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_4820ee76ad0ee4e537f1bdb4985" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_question" ADD CONSTRAINT "FK_64b66c10122a98bb8faaed64857" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_question" DROP CONSTRAINT "FK_64b66c10122a98bb8faaed64857"`);
        await queryRunner.query(`DROP TABLE "user_question"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
