import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1642267207423 implements MigrationInterface {
    name = 'Initial1642267207423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_types" RENAME COLUMN "creation_time" TO "creation_date"`);
        await queryRunner.query(`ALTER TABLE "section_types" DROP COLUMN "creation_date"`);
        await queryRunner.query(`ALTER TABLE "section_types" ADD "creation_date" date NOT NULL DEFAULT ((CURRENT_DATE))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_types" DROP COLUMN "creation_date"`);
        await queryRunner.query(`ALTER TABLE "section_types" ADD "creation_date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "section_types" RENAME COLUMN "creation_date" TO "creation_time"`);
    }

}
