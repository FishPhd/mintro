import { ArrayNotEmpty } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../profile/User";
import { SectionType } from "./SectionType";

@ObjectType()
@Entity({ name: "sections" })
@Unique(["id", "type"])
export class Section extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => SectionType)
  @ManyToOne(() => SectionType, (st) => st.sections, {
    cascade: true,
  })
  // @JoinTable()
  type: SectionType;

  @Field()
  @Column({ unique: false })
  typeId: number;

  @Field(() => [String], { nullable: true })
  @Column("text", { array: true, nullable: true })
  @ArrayNotEmpty()
  items!: [string];

  @Field()
  @Column()
  creatorId: number;

  @Field()
  @Column()
  rank: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.sections)
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
