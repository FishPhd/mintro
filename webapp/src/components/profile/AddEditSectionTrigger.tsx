import { PlusSquareIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Section } from "../../graphql/generated/graphql";
import { CreateSectionPopOver } from "./CreateEditSectionPopOver";

interface AddEditSectionTriggerProps {
  section?: Section;
  sections?: Section[];
}

//TODO REDO this and split it up
export const AddEditSectionTrigger: React.FC<AddEditSectionTriggerProps> = ({
  section,
  sections,
}) => (
  <Popover autoFocus={false}>
    {({ onClose }) => (
      <>
        {section ? (
          <PopoverTrigger>
            <IconButton
              variant="unstyled"
              aria-label="Edit Section"
              icon={
                <EditIcon color="dark.500" _hover={{ color: "dark.200" }} />
              }
            />
          </PopoverTrigger>
        ) : (
          <PopoverTrigger>
            <Button
              role="group"
              bg="white"
              _hover={{
                bgGradient: "linear(to-tr, mintro.100, mintro.200)",
                boxShadow: "lg",
              }}
              py={20}
              size="lg"
              px={5}
              mt={2}
              borderRadius="lg"
              boxShadow="md"
            >
              <Stack>
                <PlusSquareIcon
                  boxSize="50"
                  color="gray.600"
                  alignSelf="center"
                />
                <Text>Add Section</Text>
              </Stack>
            </Button>
          </PopoverTrigger>
        )}

        <Portal>
          <PopoverContent
            zIndex="popover"
            px={5}
            py={5}
            w={{ base: "lg", sm: "md", md: "xl", lg: "2xl" }}
          >
            <CreateSectionPopOver
              section={section}
              sections={sections}
              onClose={onClose}
            />
          </PopoverContent>
        </Portal>
      </>
    )}
  </Popover>
);

export default AddEditSectionTrigger;
