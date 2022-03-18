import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1644714169792 implements MigrationInterface {
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "section_items"`);
  }
}
