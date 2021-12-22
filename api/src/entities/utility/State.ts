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
@Entity({ name: "states" })
export class State extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  countryId!: number;

  @Field()
  @Column({ length: "2" })
  countryCode!: string;

  @Field()
  @Column({ nullable: true })
  fipsCode: string;

  @Field()
  @Column({ length: "10" })
  iso2!: string;

  @Field()
  @Column({ type: "decimal", precision: 10, scale: 8, nullable: true })
  latitude: number;

  @Field()
  @Column({ type: "decimal", precision: 11, scale: 8, nullable: true })
  longitude: number;

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
