import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1643689915242 implements MigrationInterface {
    name = 'Initial1643689915242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_contact_info" DROP CONSTRAINT "FK_5d8231ae0d3ed4726fc9394bdcd"`);
        await queryRunner.query(`ALTER TABLE "contact_types" ADD "placeholder" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_contact_info" ADD "input" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT ((CURRENT_DATE))`);
        await queryRunner.query(`ALTER TABLE "contact_types" ALTER COLUMN "url" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contact_types" ALTER COLUMN "profile_url_template" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contact_types" ALTER COLUMN "color1" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contact_types" ALTER COLUMN "color2" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact_types" ALTER COLUMN "color2" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contact_types" ALTER COLUMN "color1" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contact_types" ALTER COLUMN "profile_url_template" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contact_types" ALTER COLUMN "url" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT CURRENT_DATE`);
        await queryRunner.query(`ALTER TABLE "users_contact_info" DROP COLUMN "input"`);
        await queryRunner.query(`ALTER TABLE "contact_types" DROP COLUMN "placeholder"`);
        await queryRunner.query(`ALTER TABLE "users_contact_info" ADD CONSTRAINT "FK_5d8231ae0d3ed4726fc9394bdcd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
