import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1643948335060 implements MigrationInterface {
    name = 'Initial1643948335060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact_types" ADD "prefix" character varying`);
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT ((CURRENT_DATE))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT CURRENT_DATE`);
        await queryRunner.query(`ALTER TABLE "contact_types" DROP COLUMN "prefix"`);
    }

}
