import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFactToUser1699166897259 implements MigrationInterface {
    name = 'AddFactToUser1699166897259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "fact" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "fact"`);
    }

}
