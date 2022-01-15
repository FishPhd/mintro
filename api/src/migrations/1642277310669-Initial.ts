import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1642277310669 implements MigrationInterface {
    name = 'Initial1642277310669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_types" ADD "creation_date" date NOT NULL DEFAULT ((CURRENT_DATE))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_types" DROP COLUMN "creation_date"`);
    }

}
