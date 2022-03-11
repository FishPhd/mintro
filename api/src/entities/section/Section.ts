import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../profile/User";
import { SectionItem } from "./SectionItem";
import { SectionType } from "./SectionType";

@ObjectType()
@Entity({ name: "sections" })
@Unique(["id", "typeId", "deletedAt"])
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

  // @Field(() => [String], { nullable: true })
  // @Column("text", { array: true, nullable: true })
  // @ArrayNotEmpty()
  // items!: [string];

  @Field(() => [SectionItem], { nullable: true })
  @OneToMany(() => SectionItem, (si) => si.section, {
    cascade: true,
    nullable: true,
  })
  items: SectionItem[];

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

  @DeleteDateColumn()
  deletedAt?: Date;
}
