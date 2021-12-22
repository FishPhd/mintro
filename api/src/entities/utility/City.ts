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
@Entity({ name: "cities" })
export class City extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  stateId!: number;

  @Field()
  @Column()
  stateCode!: string;

  @Field()
  @Column()
  countryId!: number;

  @Field()
  @Column({ length: "2" })
  countryCode!: string;

  @Field()
  @Column({ type: "decimal", precision: 10, scale: 8 })
  latitude!: number;

  @Field()
  @Column({ type: "decimal", precision: 11, scale: 8 })
  longitude!: number;

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
