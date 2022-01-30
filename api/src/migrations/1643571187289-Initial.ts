import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1643571187289 implements MigrationInterface {
    name = 'Initial1643571187289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_contact_info" DROP CONSTRAINT "FK_5d8231ae0d3ed4726fc9394bdcd"`);
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT ((CURRENT_DATE))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT CURRENT_DATE`);
        await queryRunner.query(`ALTER TABLE "users_contact_info" ADD CONSTRAINT "FK_5d8231ae0d3ed4726fc9394bdcd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
