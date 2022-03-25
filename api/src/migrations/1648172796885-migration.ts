import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1648172796885 implements MigrationInterface {
    name = 'migration1648172796885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_items" DROP CONSTRAINT "FK_941a36988414f88e07e2a599ae0"`);
        await queryRunner.query(`ALTER TABLE "section_items" ALTER COLUMN "section_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "section_items" ALTER COLUMN "content" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "section_items" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "section_items" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "section_items" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "section_items" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT ((CURRENT_DATE))`);
        await queryRunner.query(`ALTER TABLE "section_items" ADD CONSTRAINT "FK_941a36988414f88e07e2a599ae0" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_items" DROP CONSTRAINT "FK_941a36988414f88e07e2a599ae0"`);
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT CURRENT_DATE`);
        await queryRunner.query(`ALTER TABLE "section_items" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "section_items" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "section_items" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "section_items" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "section_items" ALTER COLUMN "content" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "section_items" ALTER COLUMN "section_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "section_items" ADD CONSTRAINT "FK_941a36988414f88e07e2a599ae0" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
