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
import { Section } from "./Section";

@ObjectType()
@Entity({ name: "section_types" })
export class SectionType extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Section, (s) => s.type)
  sections: Section[];

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  type!: string;

  @Field()
  @Column()
  itemNames!: string;

  @Field()
  @Column({ default: false })
  hidden!: boolean;

  @Field()
  @Column()
  tagline!: string;

  @Field()
  @Column()
  inputType!: string;

  @Field()
  @Column()
  maxItems!: number;

  @Field(() => String)
  @Column({ type: "date", default: () => "((CURRENT_DATE))" })
  creationDate: Date;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
