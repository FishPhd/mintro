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

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  url: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  profileUrlTemplate: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  color1: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  color2: string;

  @Field()
  @Column()
  placeholder!: string;

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
