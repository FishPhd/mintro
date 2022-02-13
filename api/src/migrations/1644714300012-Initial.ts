import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1644714300012 implements MigrationInterface {
    name = 'Initial1644714300012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sections" DROP CONSTRAINT "UQ_79991f411f0ac131cccf54662a1"`);
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT ((CURRENT_DATE))`);
        await queryRunner.query(`ALTER TABLE "section_items" ALTER COLUMN "section_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "section_items" ALTER COLUMN "content" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "section_items" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "section_items" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "section_items" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "section_items" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "sections" ADD CONSTRAINT "UQ_80f9a83fadec207c5ac75d44174" UNIQUE ("id", "type_id", "deleted_at")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sections" DROP CONSTRAINT "UQ_80f9a83fadec207c5ac75d44174"`);
        await queryRunner.query(`ALTER TABLE "section_items" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "section_items" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "section_items" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "section_items" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "section_items" ALTER COLUMN "content" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "section_items" ALTER COLUMN "section_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT CURRENT_DATE`);
        await queryRunner.query(`ALTER TABLE "sections" ADD CONSTRAINT "UQ_79991f411f0ac131cccf54662a1" UNIQUE ("id", "type_id")`);
    }

}
