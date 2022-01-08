import { IsAlphanumeric, IsOptional, Length } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Member } from "../groups/Member";

@ObjectType()
@Entity({ name: "groups" })
export class Group extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Member, (member) => member.group)
  members: Member[];

  @Field(() => String)
  @Column({ unique: true })
  @IsAlphanumeric()
  @Length(2)
  url: String;

  @Field(() => String)
  @Column({ unique: true })
  @Length(2)
  name: String;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description: String;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  groupImageUrl: String;

  @Field()
  @Column()
  creatorId: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  @Length(5)
  password: string;

  @Field()
  @Column({ default: 1 })
  memberCount: number;

  @DeleteDateColumn()
  deletedAt?: Date;
}
