import { IsPhoneNumber, Length, ValidateIf } from "class-validator";
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
import { ContactType } from "../utility/ContactType";

@ObjectType()
@Unique(["userId", "contactTypeId"])
@Entity({ name: "users_contact_info" })
export class UserContact extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  userId: number;

  @Field()
  @Column()
  contactTypeId: number;

  @Field()
  @ValidateIf((ct) => ct.contactTypeId === 1 && ct.input != "")
  @IsPhoneNumber("US")
  @Length(10, 15, {
    message: `Phone number must be between $constraint1 and $constraint2 digits`,
  })
  @Column()
  input: string;

  // RELATIONS
  // @ManyToOne(() => User, (user) => user.id)
  // user: User;
  @Field(() => ContactType)
  @ManyToOne(() => ContactType, (contactType) => contactType.id)
  contactType: ContactType;

  @DeleteDateColumn()
  deletedAt?: Date;
}
