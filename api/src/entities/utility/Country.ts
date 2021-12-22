import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity({ name: "countries" })
export class Country extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column({ length: "3" })
  iso3!: string;

  @Field()
  @Column({ length: "2" })
  iso2!: string;

  @Field()
  @Column()
  phonecode!: string;

  @Field()
  @Column()
  capital!: string;

  @Field()
  @Column()
  currency!: string;

  @Field()
  @Column()
  currencySymbol!: string;

  @Field()
  @Column()
  tld!: string;

  @Field()
  @Column()
  native!: string;

  @Field()
  @Column()
  region!: string;

  @Field()
  @Column()
  subregion!: string;

  @Field()
  @Column()
  timezones!: string;

  @Field()
  @Column()
  translations!: string;

  @Field()
  @Column({ type: "decimal", precision: 10, scale: 8 })
  latitude!: number;

  @Field()
  @Column({ type: "decimal", precision: 11, scale: 8 })
  longitude!: number;

  @Field()
  @Column({ length: "191" })
  emoji!: string;

  @Field()
  @Column({ length: "191" })
  emojiU!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column({ type: "smallint" })
  flag: number;

  @Field()
  @Column({ nullable: true })
  wikiDataId: string;
}
