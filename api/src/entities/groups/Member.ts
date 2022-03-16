import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { User } from "../profile/User";
import { Group } from "./Group";

@ObjectType()
@Entity({ name: "members" })
@Unique(["groupId", "userId", "deletedAt"])
export class Member extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  groupId: number;

  @Field(() => Boolean)
  @Column({ type: "boolean", default: false })
  admin: Boolean;

  @ManyToOne(() => Group, (group) => group.id, { onDelete: "CASCADE" })
  group: Group;

  @Field()
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @DeleteDateColumn()
  deletedAt?: Date;
}
