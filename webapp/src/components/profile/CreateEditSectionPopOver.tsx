import {
  Box,
  Button,
  Input,
  PopoverCloseButton,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FieldArray, Form, Formik } from "formik";
import React from "react";
import {
  Section,
  SectionType,
  useCreateSectionMutation,
  useGetDistinctSectionTypesQuery,
  useGetSectionTypesQuery,
  useUpdateSectionMutation,
} from "../../graphql/generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../forms/InputField";
import { SelectField } from "../forms/SelectField";

interface CreateSectionPopOverProps {
  section?: Section;
  sections?: Section[];
  onClose: () => void;
}

export const CreateSectionPopOver: React.FC<CreateSectionPopOverProps> = ({
  section,
  sections,
  onClose,
}) => {
  console.log(section);
  const [createSection] = useCreateSectionMutation();
  const [updateSection] = useUpdateSectionMutation();
  const { data: { getSectionTypes: sectionTypes } = {} } =
    useGetSectionTypesQuery();
  const { data: { getDistinctSectionTypes: distinctTypes } = {} } =
    useGetDistinctSectionTypesQuery();
  const toast = useToast();

  return (
    <>
      <Box>
        <Formik
          initialValues={
            section
              ? {
                  typeId: section.typeId ? section.typeId : undefined,
                  sectionName: section.type.name
                    ? section.type.name
                    : undefined,
                  items: section.items ? section.items : undefined,
                }
              : { sectionName: "", typeId: 0, items: ["", "", ""] }
          }
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={async (
            values,
            { setErrors, setFieldValue, resetForm, validateForm }
          ) => {
            validateForm();

            // If updating section
            if (section) {
              await updateSection({
                variables: {
                  id: section.id,
                  items: values.items ? values.items : [""],
                },
                update: (cache) => {
                  cache.evict({ fieldName: "updateSection" });
                  cache.evict({ fieldName: "getSectionsByUser" });
                },
              });
              setFieldValue("items", values.items);
            } else {
              // If creating section
              // const { data: { getUser: user } = {}, loading: userFetching }
              const { data: sectionResult } = await createSection({
                variables: {
                  typeId: values.typeId ? values.typeId : -1,
                  items: values.items ? values.items : [""],
                },
                update: (cache) => {
                  cache.evict({ fieldName: "getSectionsByUser" });
                },
              });

              const response = sectionResult?.createSection;
              if (response?.errors) {
                if (response.errors[0].field == "section") {
                  toast({
                    title: "Too many Sections!",
                    description: response.errors[0].message,
                    status: "error",
                    duration: 4500,
                    isClosable: true,
                  });
                  await resetForm({});
                  onClose();
                }

                setErrors(toErrorMap(response.errors));
                return;
              }
              await resetForm({});
            }
            onClose();
          }}
        >
          {({ isSubmitting, setFieldValue, values, setErrors }) => (
            <Form>
              <Stack spacing={4}>
                {!section && (
                  <Select
                    as={SelectField}
                    borderColor={!section ? "mintro.200" : undefined}
                    focusBorderColor={!section ? "mintro.200" : undefined}
                    placeholder="Select section type..."
                    variant="filled"
                    name={"sectionName"}
                    label={"Section"}
                    bg="white"
                    size={"lg"}
                    key="sectionName"
                    value={values.sectionName || ""}
                    isDisabled={!!section}
                    disableIcon={!!section}
                    iconSize={"10"}
                    icon={<></>}
                    onChange={async (e) => {
                      setErrors({});
                      const selectedIndex = e.target.options.selectedIndex;
                      const sectionTypeId =
                        e.target.options[selectedIndex].getAttribute("data-id");
                      setFieldValue("sectionName", e.target.value);
                      if (sectionTypeId) {
                        setFieldValue("typeId", parseInt(sectionTypeId));
                      }
                    }}
                    // options={content}
                  >
                    {distinctTypes?.map((st) => (
                      <optgroup key={st.type} label={st.type}>
                        {sectionTypes
                          ?.filter((s: SectionType) => s.type == st.type)
                          .map(
                            (section: SectionType) =>
                              sections?.findIndex(
                                (s) => s.typeId == section.id
                              ) == -1 &&
                              !section.hidden && (
                                <option key={section.id} data-id={section.id}>
                                  {section.name}
                                </option>
                              )
                          )}
                      </optgroup>
                    ))}
                  </Select>
                )}
                {values.sectionName && (
                  <FieldArray
                    name="items"
                    render={() => (
                      <>
                        {sectionTypes
                          ?.filter((s: SectionType) => s.id == values.typeId)
                          ?.map((section, index: number) => (
                            <Box
                              name={index}
                              mt={[0, "0px !important"]}
                              key={index}
                            >
                              <Text fontWeight="bold" fontSize="4xl" pt={4}>
                                {section.name}
                              </Text>
                              <Text
                                fontSize="lg"
                                pb={2}
                                color={"dark.300"}
                                fontStyle={"italic"}
                              >
                                {section.tagline}
                              </Text>
                              {Array.from(Array(section.maxItems).keys()).map(
                                (index: number) => (
                                  <Box key={section.name + "_wrapper" + index}>
                                    {section.name == values.sectionName && (
                                      <Input
                                        mt={0}
                                        as={InputField}
                                        hasText={
                                          section.inputType === "textarea"
                                        }
                                        focusBorderColor="mintro.300"
                                        name={`items.${index}`}
                                        placeholder={section.itemNames}
                                        value={
                                          values.items
                                            ? values.items[index]
                                            : undefined
                                        }
                                        my={2}
                                        variant="outline"
                                        bg="white"
                                        errorBorderColor="red.200"
                                      />
                                    )}
                                  </Box>
                                )
                              )}
                            </Box>
                          ))}
                        <Button
                          type="submit"
                          variant="mintro"
                          isLoading={isSubmitting}
                          size="lg"
                          mt={[20, " 20px !important"]}
                          fontSize="md"
                          color="dark.500"
                        >
                          {section ? "Update" : "Create"}
                        </Button>
                      </>
                    )}
                  />
                )}
              </Stack>
              <PopoverCloseButton p={5} />
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};
