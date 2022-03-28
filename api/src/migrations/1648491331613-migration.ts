import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1648491331613 implements MigrationInterface {
    name = 'migration1648491331613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT CURRENT_DATE::text::date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT CURRENT_DATE`);
    }

}
