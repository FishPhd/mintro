import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity({ name: "contact_types" })
export class ContactType extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  icon!: string;

  @Field()
  @Column()
  url!: string;

  @Field()
  @Column()
  profileUrlTemplate!: string;

  @Field()
  @Column()
  color1: string;

  @Field()
  @Column()
  color2!: string;

  @Field(() => Boolean)
  @Column({ type: "boolean", default: false })
  socialMedia!: boolean;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
