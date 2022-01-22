import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1642887144062 implements MigrationInterface {
    name = 'Initial1642887144062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact_types" ADD "placeholder" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT ((CURRENT_DATE))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT CURRENT_DATE`);
        await queryRunner.query(`ALTER TABLE "contact_types" DROP COLUMN "placeholder"`);
    }

}
