import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1647041815146 implements MigrationInterface {
  name = "Initial1647041815146";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "section_items" ALTER COLUMN "order" set NOT NULL;`
    );
    await queryRunner.query(
      `ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT ((CURRENT_DATE))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT CURRENT_DATE`
    );
    await queryRunner.query(`ALTER TABLE "section_items" ADD "order" int`);
    await queryRunner.query(`ALTER TABLE "sections" ADD "items" text array`);
  }
}
