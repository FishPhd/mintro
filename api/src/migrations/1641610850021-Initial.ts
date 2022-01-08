import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1641610850021 implements MigrationInterface {
    name = 'Initial1641610850021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_types" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "sections" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "members" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "section_types" DROP COLUMN "deleted_at"`);
    }

}
