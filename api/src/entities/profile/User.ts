import {
  IsAlphanumeric,
  IsEmail,
  IsPhoneNumber,
  Length,
} from "class-validator";
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
// import { Member } from "../groups/Member";
import { Member } from "../groups/Member";
import { Section } from "../section/Section";
import { UserContact } from "./UserContact";

@ObjectType()
@Entity({ name: "users" })
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  @IsAlphanumeric()
  @Length(2)
  username!: string;

  @Field(() => String)
  @Column({ unique: true })
  @IsPhoneNumber("US")
  @Length(10, 15)
  phoneNumber: String;

  @Field(() => String)
  @Column({ unique: true })
  @IsEmail()
  email: String;

  @Column()
  @Length(6)
  password!: string;

  @OneToMany(() => Section, (section) => section.creator)
  sections: Section[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  firstName: String;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  lastName: String;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  nickname: String;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  profileImageUrl: String;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  namePronunciation: String;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  tagline: String;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  homeTown: String;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  pronouns: String;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  city: String;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  state: String;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  country: String;

  @Field(() => Boolean)
  @Column({ type: "boolean", default: false })
  profileSetup: Boolean;

  @Field(() => String, { nullable: true })
  @Column({ type: "date", nullable: true })
  birthday: Date;

  // RELATIONS
  @OneToMany(() => Member, (Member) => Member.user)
  groups: Member[];

  @OneToMany(() => UserContact, (UserContact) => UserContact.user)
  socials: UserContact[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
