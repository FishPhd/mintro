import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1646966192430 implements MigrationInterface {
    name = 'Initial1646966192430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_items" DROP CONSTRAINT "FK_f2a1ccd5738da3b88cadafcbbf7"`);
        await queryRunner.query(`ALTER TABLE "sections" DROP CONSTRAINT "UQ_0d934f54457d889a45010f92795"`);
        await queryRunner.query(`ALTER TABLE "sections" RENAME COLUMN "section_id" TO "id"`);
        await queryRunner.query(`ALTER TABLE "sections" RENAME CONSTRAINT "PK_c5641bfa4992d9bb24205e4cf12" TO "PK_f9749dd3bffd880a497d007e450"`);
        await queryRunner.query(`ALTER SEQUENCE "sections_section_id_seq" RENAME TO "sections_id_seq"`);
        await queryRunner.query(`ALTER TABLE "section_items" DROP COLUMN "section_section_id"`);
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT ((CURRENT_DATE))`);
        await queryRunner.query(`ALTER TABLE "sections" ADD CONSTRAINT "UQ_80f9a83fadec207c5ac75d44174" UNIQUE ("id", "type_id", "deleted_at")`);
        await queryRunner.query(`ALTER TABLE "section_items" ADD CONSTRAINT "FK_941a36988414f88e07e2a599ae0" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_items" DROP CONSTRAINT "FK_941a36988414f88e07e2a599ae0"`);
        await queryRunner.query(`ALTER TABLE "sections" DROP CONSTRAINT "UQ_80f9a83fadec207c5ac75d44174"`);
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT CURRENT_DATE`);
        await queryRunner.query(`ALTER TABLE "section_items" ADD "section_section_id" integer`);
        await queryRunner.query(`ALTER SEQUENCE "sections_id_seq" RENAME TO "sections_section_id_seq"`);
        await queryRunner.query(`ALTER TABLE "sections" RENAME CONSTRAINT "PK_f9749dd3bffd880a497d007e450" TO "PK_c5641bfa4992d9bb24205e4cf12"`);
        await queryRunner.query(`ALTER TABLE "sections" RENAME COLUMN "id" TO "section_id"`);
        await queryRunner.query(`ALTER TABLE "sections" ADD CONSTRAINT "UQ_0d934f54457d889a45010f92795" UNIQUE ("section_id", "type_id", "deleted_at")`);
        await queryRunner.query(`ALTER TABLE "section_items" ADD CONSTRAINT "FK_f2a1ccd5738da3b88cadafcbbf7" FOREIGN KEY ("section_section_id") REFERENCES "sections"("section_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
