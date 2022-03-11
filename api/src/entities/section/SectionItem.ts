import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Section } from "./Section";

@ObjectType()
@Entity({ name: "section_items" })
export class SectionItem extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: false })
  sectionId: number;

  @Field(() => String, { nullable: false })
  @Column("text", { nullable: false })
  content!: string;

  @ManyToOne(() => Section, (s) => s.items)
  section: Section;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
