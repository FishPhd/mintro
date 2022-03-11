import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
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

  @Field({ nullable: false })
  @Column({ unique: false })
  sectionId!: number;

  @Field({ nullable: false })
  @Column({ unique: false })
  order!: number;

  @Field(() => String, { nullable: false })
  @Column("text", { nullable: false })
  content!: string;

  @ManyToOne(() => Section, (s) => s.items, {
    orphanedRowAction: "delete",
  })
  @JoinColumn([{ name: "section_id", referencedColumnName: "id" }])
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
