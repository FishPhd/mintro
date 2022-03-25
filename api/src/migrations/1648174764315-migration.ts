import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1648174764315 implements MigrationInterface {
  name = "migration1648174764315";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "section_items" ALTER COLUMN "rank" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT ((CURRENT_DATE))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT CURRENT_DATE`
    );
  }
}
