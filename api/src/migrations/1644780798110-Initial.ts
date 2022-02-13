import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1644780798110 implements MigrationInterface {
    name = 'Initial1644780798110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sections" DROP CONSTRAINT "FK_f1ae0db859e93832738154ea011"`);
        await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "items_id"`);
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT ((CURRENT_DATE))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT CURRENT_DATE`);
        await queryRunner.query(`ALTER TABLE "sections" ADD "items_id" integer`);
        await queryRunner.query(`ALTER TABLE "sections" ADD CONSTRAINT "FK_f1ae0db859e93832738154ea011" FOREIGN KEY ("items_id") REFERENCES "section_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
