import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1646967415977 implements MigrationInterface {
    name = 'Initial1646967415977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT ((CURRENT_DATE))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT CURRENT_DATE`);
    }

}
