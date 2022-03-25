import { defaultSource } from "../index";
import { Arg, Int, Query, Resolver } from "type-graphql";
import { Section } from "../entities/section/Section";
import { SectionType } from "../entities/section/SectionType";

@Resolver(Section)
export class SectionTypeResolver {
  @Query(() => [SectionType])
  async getSectionTypes(): Promise<SectionType[]> {
    return SectionType.find();
  }

  @Query(() => SectionType)
  async getSectionType(
    @Arg("sectionTypeId", () => Int) sectionTypeId: number
  ): Promise<SectionType> {
    return SectionType.findOneByOrFail({
      id: sectionTypeId,
    });
  }

  @Query(() => [SectionType])
  async getDistinctSectionTypes(): Promise<SectionType[]> {
    const result = await defaultSource.query(`SELECT * FROM section_types
    WHERE id IN
    (SELECT MIN(id) FROM section_types where hidden = false GROUP BY type ) order by creation_date DESC`);
    return result;
  }
}
