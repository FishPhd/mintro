import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1647390337836 implements MigrationInterface {
    name = 'Initial1647390337836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "UQ_cc9fc60eb3b68d9a992e0d914d3"`);
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT ((CURRENT_DATE))`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "UQ_fd7c583b968f60f2cbc4779d9b2" UNIQUE ("group_id", "user_id", "deleted_at")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "UQ_fd7c583b968f60f2cbc4779d9b2"`);
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT CURRENT_DATE`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "UQ_cc9fc60eb3b68d9a992e0d914d3" UNIQUE ("group_id", "user_id")`);
    }

}
