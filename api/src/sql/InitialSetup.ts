import { MigrationInterface, QueryRunner } from "typeorm";
import CitiesMigrationSQL from "./cities";
import CountriesMigrationSQL from "./countries";
import sectionTypesMigrationSQL from "./sectionTypes";
import StatesMigrationSQL from "./states";

export class Initial1628636968370 implements MigrationInterface {
  name = "Initial1628636968370";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "phone_number" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying, "last_name" character varying, "nickname" character varying, "name_pronunciation" character varying, "tagline" character varying, "home_town" character varying, "pronouns" character varying, "city" character varying, "state" character varying, "country" character varying, "profile_setup" boolean NOT NULL DEFAULT false, "birthday" date, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_17d1817f241f10a3dbafb169fd2" UNIQUE ("phone_number"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "sections" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "items" text array, "num_likes" integer NOT NULL DEFAULT '0', "creator_id" integer NOT NULL, "rank" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_82c7ecc32416f13d3e5987f7b59" UNIQUE ("id", "type"), CONSTRAINT "PK_f9749dd3bffd880a497d007e450" PRIMARY KEY ("id"))`
    );

    await queryRunner.query(
      `CREATE TABLE section_types ( "id" integer NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "item_names" character varying NOT NULL, "tagline" character varying NOT NULL, "input_type" character varying NOT NULL, "max_items" integer NOT NULL, "created_at" timestamp without time zone DEFAULT now() NOT NULL, "updated_at" timestamp without time zone DEFAULT now() NOT NULL, "hidden" boolean DEFAULT false NOT NULL )`
    );

    await queryRunner.query(
      `CREATE TABLE "cities" ("id" integer NOT NULL, "name" character varying NOT NULL, "state_id" integer NOT NULL, "state_code" character varying NOT NULL, "country_id" integer NOT NULL, "country_code" character varying(2) NOT NULL, "latitude" numeric(10,8) NOT NULL, "longitude" numeric(11,8) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "flag" smallint NOT NULL, "wiki_data_id" character varying, CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "countries" ("id" integer NOT NULL, "name" character varying NOT NULL, "iso3" character varying(3) NOT NULL, "iso2" character varying(2) NOT NULL, "phonecode" character varying NOT NULL, "capital" character varying NOT NULL, "currency" character varying NOT NULL, "currency_symbol" character varying NOT NULL, "tld" character varying NOT NULL, "native" character varying NOT NULL, "region" character varying NOT NULL, "subregion" character varying NOT NULL, "timezones" character varying NOT NULL, "translations" character varying NOT NULL, "latitude" numeric(10,8) NOT NULL, "longitude" numeric(11,8) NOT NULL, "emoji" character varying(191) NOT NULL, "emoji_u" character varying(191) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "flag" smallint NOT NULL, "wiki_data_id" character varying, CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "states" ("id" integer NOT NULL, "name" character varying NOT NULL, "country_id" integer NOT NULL, "country_code" character varying(2) NOT NULL, "fips_code" character varying, "iso2" character varying(10) NOT NULL, "latitude" numeric(10,8), "longitude" numeric(11,8), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "flag" smallint NOT NULL, "wiki_data_id" character varying, CONSTRAINT "PK_09ab30ca0975c02656483265f4f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "sections" ADD CONSTRAINT "FK_a47e7b8d541036cfb2ec23e1d2e" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE ONLY section_types ADD CONSTRAINT "PK_fe2e7e0e1ce4691acce3feba35b" PRIMARY KEY (id)`
    );
    await queryRunner.query(
      `ALTER TABLE ONLY section_types ADD CONSTRAINT "UQ_ab7aa68c5dd25288eda6ead7695" UNIQUE (name)`
    );
    console.log("Running world database migration!");
    await queryRunner.query(CountriesMigrationSQL);
    await queryRunner.query(StatesMigrationSQL);
    await queryRunner.query(CitiesMigrationSQL);
    console.log("World database setup complete!");

    console.log("Running Section_type Migration!");
    await queryRunner.query(sectionTypesMigrationSQL);
    console.log("Section_type database setup complete!");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sections" DROP CONSTRAINT "FK_a47e7b8d541036cfb2ec23e1d2e"`
    );

    await queryRunner.query(
      `ALTER TABLE "section_types" DROP CONSTRAINT "PK_fe2e7e0e1ce4691acce3feba35b"`
    );

    await queryRunner.query(
      `ALTER TABLE "section_types" DROP CONSTRAINT "UQ_ab7aa68c5dd25288eda6ead7695"`
    );

    await queryRunner.query(`DROP TABLE "states"`);
    await queryRunner.query(`DROP TABLE "countries"`);
    await queryRunner.query(`DROP TABLE "cities"`);
    await queryRunner.query(`DROP TABLE "sections"`);
    await queryRunner.query(`DROP TABLE "section_types"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
