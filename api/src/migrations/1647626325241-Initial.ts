import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1647626325241 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "section_items" AS select section_id, content, rank, created_at, updated_at, deleted_at
    FROM  (
       SELECT id as section_id, content, i as rank, created_at, updated_at, deleted_at
       FROM sections s, unnest(s.items) WITH ORDINALITY AS x(content, i)
       ) sub
    WHERE content <> '';
    
    `);
    await queryRunner.query(
      `ALTER TABLE "section_items" ADD id SERIAL PRIMARY KEY NOT NULL;`
    );

    await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "items"`);
    await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT ((CURRENT_DATE))`);
    await queryRunner.query(`ALTER TABLE "section_items" ADD CONSTRAINT "FK_941a36988414f88e07e2a599ae0" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "section_items"`);
        await queryRunner.query(`ALTER TABLE "section_items" DROP CONSTRAINT "FK_941a36988414f88e07e2a599ae0"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "UQ_fd7c583b968f60f2cbc4779d9b2"`);
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT CURRENT_DATE`);
        await queryRunner.query(`ALTER TABLE "sections" ADD "items" text array`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "UQ_cc9fc60eb3b68d9a992e0d914d3" UNIQUE ("group_id", "user_id")`);
    }

}
