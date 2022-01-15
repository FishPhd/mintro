import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1642266402655 implements MigrationInterface {
    name = 'Initial1642266402655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_types" ADD "creation_time" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_types" DROP COLUMN "creation_time"`);
    }

}
