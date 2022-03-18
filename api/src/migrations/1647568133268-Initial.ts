import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1647568133268 implements MigrationInterface {
    name = 'Initial1647568133268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "items"`);
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT ((CURRENT_DATE))`);
        await queryRunner.query(`ALTER TABLE "section_items" ADD CONSTRAINT "FK_941a36988414f88e07e2a599ae0" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_items" DROP CONSTRAINT "FK_941a36988414f88e07e2a599ae0"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "UQ_fd7c583b968f60f2cbc4779d9b2"`);
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT CURRENT_DATE`);
        await queryRunner.query(`ALTER TABLE "sections" ADD "items" text array`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "UQ_cc9fc60eb3b68d9a992e0d914d3" UNIQUE ("group_id", "user_id")`);
    }

}
