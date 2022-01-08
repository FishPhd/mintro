import { ArrowDownIcon, ArrowUpIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Flex,
  IconButton,
  Spacer,
  Stack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import {
  Section,
  useDeleteSectionMutation,
  useUpdateSectionRankMutation,
} from "../../graphql/generated/graphql";
import AddEditSectionTrigger from "./AddEditSectionTrigger";

interface UserSectionsProps {
  sections?: Section[];
  isMyProfile: boolean;
}

export const UserSections: React.FC<UserSectionsProps> = ({
  sections,
  isMyProfile,
}) => {
  const date_time = new Date().getTime();
  const [deleteSection] = useDeleteSectionMutation();
  const [updateRank] = useUpdateSectionRankMutation();
  return (
    <AnimatePresence presenceAffectsLayout>
      {sections &&
        sections.map((section, index: number) => (
          <motion.div
            layout
            key={section.id}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
          >
            <Box
              key={section.id}
              index={index}
              py={isMyProfile ? 2 : 8}
              px={5}
              borderRadius="lg"
              boxShadow="md"
              bg="white"
            >
              <Flex>
                {(date_time - parseInt(section.updatedAt)) /
                  (1000 * 3600 * 24) <
                  2 && (
                  <Badge
                    borderRadius="full"
                    height="6"
                    my={3}
                    px={3}
                    py={1}
                    bg="mintro.200"
                    color="dark.500"
                  >
                    New
                  </Badge>
                )}

                <Spacer />
                {isMyProfile && (
                  <>
                    {index + 1 != sections.length && (
                      <IconButton
                        aria-label="Move Section Down"
                        variant="unstyled"
                        icon={<ArrowDownIcon />}
                        color="dark.500"
                        _hover={{ color: "mintro.200" }}
                        onClick={() => {
                          const ranks =
                            index + 2 < sections.length
                              ? [
                                  sections[index + 1].rank,
                                  sections[index + 2].rank,
                                ]
                              : [sections[index + 1].rank];

                          // if (index + 2 < sections.length) {
                          //   ranks = [
                          //     sections[index + 1].rank,
                          //     sections[index + 2].rank,
                          //   ];
                          // } else {
                          //   ranks = [sections[index + 1].rank];
                          // }

                          // TODO: Evict only specific section to avoid refetch
                          updateRank({
                            variables: {
                              id: section.id,
                              ranks,
                              movingUp: false,
                            },
                            update: (cache) => {
                              cache.evict({ fieldName: "getSectionsByUser" });
                            },
                          });
                        }}
                      />
                    )}
                    {index != 0 && (
                      <IconButton
                        aria-label="Move Section Up"
                        variant="unstyled"
                        icon={<ArrowUpIcon />}
                        color="dark.500"
                        _hover={{ color: "mintro.200" }}
                        boxShadow={undefined}
                        onClick={() => {
                          const ranks =
                            index - 1 > 0
                              ? [
                                  sections[index - 1].rank,
                                  sections[index - 2].rank,
                                ]
                              : [sections[index - 1].rank];

                          // TODO: Evict only specific section to avoid refetch
                          updateRank({
                            variables: {
                              id: section.id,
                              ranks,
                              movingUp: true,
                            },
                            update: (cache) => {
                              cache.evict({ fieldName: "getSectionsByUser" });
                            },
                          });
                        }}
                      />
                    )}

                    <AddEditSectionTrigger section={section} />
                    <IconButton
                      aria-label="Delete Section"
                      variant="unstyled"
                      icon={<DeleteIcon />}
                      color="dark.500"
                      _hover={{ color: "red.300" }}
                      onClick={() => {
                        deleteSection({
                          variables: { id: section.id },
                          update: (cache) => {
                            cache.evict({
                              id: "Section:" + section.id,
                            });
                          },
                        });
                      }}
                    />
                  </>
                )}
              </Flex>
              <Stack
                mt={
                  isMyProfile &&
                  (date_time - parseInt(section.updatedAt)) /
                    (1000 * 3600 * 24) >
                    2
                    ? -5
                    : 0
                }
                spacing="0"
                lineHeight="1"
              >
                <Box
                  color="dark.500"
                  fontSize={{ base: "md", md: "md", lg: "nd" }}
                >
                  {section.type.type}
                </Box>
                <Box
                  fontWeight="800"
                  color="dark.500"
                  fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
                >
                  {section.type.name}
                </Box>
              </Stack>

              <Wrap justify="center" py={2} maxW={"4xl"} mb={2}>
                {section?.items?.map((item: string, index: number) => (
                  <WrapItem key={item + "_" + index}>
                    {item && (
                      <Box
                        maxW={{ base: "xs", md: "md", lg: "lg" }}
                        fontWeight={"500"}
                        p={8}
                        rounded="3xl"
                        color="dark.500"
                        textAlign="center"
                        key={item + "_" + index}
                        bgGradient="linear(to-tr, mintro.200, mintro.300)"
                      >
                        {item}
                      </Box>
                    )}
                  </WrapItem>
                ))}
              </Wrap>
            </Box>
          </motion.div>
        ))}
    </AnimatePresence>
  );
};
