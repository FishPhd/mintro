import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Input,
  Text,
  Stack,
  Flex,
  Select,
  PopoverCloseButton,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { number } from "yup/lib/locale";
import {
  Section,
  useCreateSectionMutation,
  useGetDistinctSectionTypesQuery,
  useGetSectionQuery,
  useGetSectionTypesQuery,
  useUpdateSectionMutation,
} from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../forms/InputField";
import { SelectField } from "../forms/SelectField";

const schema = Yup.object().shape({
  friends: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().min(4, "too short").required("Required"), // these constraints take precedence
        salary: Yup.string().min(3, "cmon").required("Required"), // these constraints take precedence
      })
    )
    .required("Must have friends") // these constraints are shown if and only if inner constraints are satisfied
    .min(3, "Minimum of 3 friends"),
});

interface CreateSectionPopOverProps {
  section?: Section;
  sections?: Section[];
  onClose?: any;
}

export const CreateSectionPopOver: React.FC<CreateSectionPopOverProps> = ({
  section,
  sections,
  onClose,
}) => {
  const [createSection] = useCreateSectionMutation();
  const [updateSection] = useUpdateSectionMutation();
  const { data: sectionTypes, loading: fetchingSectionTypes } =
    useGetSectionTypesQuery();
  const { data: distinctTypes, loading: fetchingDistinctSectionTypes } =
    useGetDistinctSectionTypesQuery();

  return (
    <>
      <Box>
        <Formik
          initialValues={
            section
              ? {
                  typeId: section.typeId!,
                  sectionName: section.type.name,
                  items: section.items!,
                }
              : { sectionName: "", typeId: 0, items: ["", "", ""] }
          }
          validateOnChange={false}
          validateOnBlur={false}
          // validationSchema={sectionInputSchema}
          onSubmit={async (
            values,
            { setErrors, setStatus, setFieldValue, resetForm, validateForm }
          ) => {
            validateForm();

            if (section) {
              const { data: updateData } = await updateSection({
                variables: {
                  id: section.id,
                  // typeId: values.typeId!,
                  items: values.items!,
                },
                update: (cache) => {
                  cache.evict({ fieldName: "updateSection" });
                  cache.evict({ fieldName: "getSectionsByUser" });
                },
              });
              setFieldValue("items", values.items!);
            } else {
              const { data: createData } = await createSection({
                variables: {
                  typeId: values.typeId!,
                  items: values.items!,
                },
                update: (cache) => {
                  cache.evict({ fieldName: "getSectionsByUser" });
                },
              });
              if (createData?.createSection.errors) {
                console.log("errors", createData?.createSection.errors);
                setErrors(toErrorMap(createData.createSection.errors));
                return;
              }
              await resetForm({});
            }
            onClose();
          }}
        >
          {({ isSubmitting, setFieldValue, values, setErrors }) => (
            <Form>
              <Stack spacing="4">
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
                    key="sectionName"
                    value={values.sectionName || ""}
                    isDisabled={!!section}
                    disableIcon={!!section}
                    iconSize={"10"}
                    icon={<></>}
                    onChange={async (e) => {
                      setErrors({});
                      let selectedIndex = e.target.options.selectedIndex;
                      let sectionTypeId =
                        e.target.options[selectedIndex].getAttribute("data-id");
                      setFieldValue("sectionName", e.target.value);
                      setFieldValue("typeId", parseInt(sectionTypeId!));
                    }}
                    // options={content}
                  >
                    {distinctTypes?.getDistinctSectionTypes.map(
                      (st, index: number) => (
                        <optgroup key={st.type} label={st.type}>
                          {sectionTypes?.getSectionTypes
                            .filter((s) => s.type == st.type)
                            .map(
                              (section, index: number) =>
                                sections?.findIndex(
                                  (s) => s.typeId == section.id
                                ) == -1 && (
                                  <option key={section.id} data-id={section.id}>
                                    {section.name}
                                  </option>
                                )
                            )}
                        </optgroup>
                      )
                    )}
                  </Select>
                )}
                {values.sectionName && (
                  <FieldArray
                    name="items"
                    render={(arrayHelpers) => (
                      <>
                        {sectionTypes?.getSectionTypes.map(
                          (section, index: number) => (
                            <Box
                              name={index}
                              mt={[0, "0 !important"]}
                              key={index}
                            >
                              {section.name == values.sectionName && (
                                <Text fontWeight="bold" size="4xl" pt={4}>
                                  {section.name}
                                </Text>
                              )}
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
                                        placeholder={section.tagline}
                                        value={values.items[index]}
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
                          )
                        )}
                        <Button
                          type="submit"
                          variant="mintro"
                          isLoading={isSubmitting}
                          size="lg"
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
