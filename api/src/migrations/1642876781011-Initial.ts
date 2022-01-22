import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1642876781011 implements MigrationInterface {
    name = 'Initial1642876781011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact_types" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "icon" character varying NOT NULL, "url" character varying NOT NULL, "profile_url_template" character varying NOT NULL, "color1" character varying NOT NULL, "color2" character varying NOT NULL, "social_media" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_cfbbcaf06c9ffa278519a0ff810" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_contact_info" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "contact_type_id" integer NOT NULL, "deleted_at" TIMESTAMP, CONSTRAINT "UQ_70aaa39cfdafa03fd654b96e329" UNIQUE ("user_id", "contact_type_id"), CONSTRAINT "PK_2b7fdd8f79a5c833bcbfe55337a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "section_types" DROP CONSTRAINT "UQ_ab7aa68c5dd25288eda6ead7695"`);
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT ((CURRENT_DATE))`);
        await queryRunner.query(`ALTER TABLE "users_contact_info" ADD CONSTRAINT "FK_5d8231ae0d3ed4726fc9394bdcd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_contact_info" ADD CONSTRAINT "FK_390d9bcbbcb8099af29154a0fad" FOREIGN KEY ("contact_type_id") REFERENCES "contact_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_contact_info" DROP CONSTRAINT "FK_390d9bcbbcb8099af29154a0fad"`);
        await queryRunner.query(`ALTER TABLE "users_contact_info" DROP CONSTRAINT "FK_5d8231ae0d3ed4726fc9394bdcd"`);
        await queryRunner.query(`ALTER TABLE "section_types" ALTER COLUMN "creation_date" SET DEFAULT CURRENT_DATE`);
        await queryRunner.query(`ALTER TABLE "section_types" ADD CONSTRAINT "UQ_ab7aa68c5dd25288eda6ead7695" UNIQUE ("name")`);
        await queryRunner.query(`DROP TABLE "users_contact_info"`);
        await queryRunner.query(`DROP TABLE "contact_types"`);
    }

}
