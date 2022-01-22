import { Arg, Int, Query, Resolver } from "type-graphql";
import { getManager, getRepository } from "typeorm";
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
    let sectionTypeRepository = getRepository(SectionType);
    const res = await sectionTypeRepository.findOne({
      where: { id: sectionTypeId },
    });

    return res!;
  }

  @Query(() => [SectionType])
  async getDistinctSectionTypes(): Promise<SectionType[]> {
    const result = await getManager().query(`SELECT * FROM section_types
    WHERE id IN
    (SELECT MIN(id) FROM section_types GROUP BY type) and hidden = false`);
    return result;
  }
}
