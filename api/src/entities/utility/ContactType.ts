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
import { UserContact } from "../profile/UserContact";

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

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  prefix!: string;

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

  // RELATIONS
  @OneToMany(() => UserContact, (UserContact) => UserContact.contactType)
  userContacts: UserContact[];
}
