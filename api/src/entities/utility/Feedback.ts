import { Length } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity({ name: "feedback" })
export class Feedback extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  userId: number;

  @Field()
  @Column()
  @Length(200)
  feedback!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
