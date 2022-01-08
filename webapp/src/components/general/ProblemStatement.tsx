import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import Card from "./Card";
import Parallax from "./Parallax";

export function ProblemStatement() {
  return (
    <>
      <Box
        as="section"
        px={{ base: "0", lg: "20" }}
        mb={{ base: "0%", lg: "5%" }}
      >
        <Box
          maxW={{ base: "xl", md: "4xl", xl: "8xl" }}
          mx="auto"
          px={{ base: "6", lg: "0" }}
        >
          <Stack
            spacing={{ base: "5", lg: "20" }}
            direction={{ base: "column-reverse", xl: "row" }}
          >
            <Stack flex="1" maxW={{ base: "3xl", lg: "3xl" }} mx="auto">
              <Card
                shadow="lg"
                h="-webkit-fit-content"

                // w={{ base: "auto", lg: "3xl" }}
              >
                <Heading
                  fontWeight="600"
                  color="dark.200"
                  fontSize={{ base: "xl", md: "3xl" }}
                >
                  Let&apos;s face it...{" "}
                </Heading>
                <Heading fontSize={{ base: "3xl", md: "4xl" }} color="dark.500">
                  Real Introductions are Rare
                </Heading>
              </Card>
              <Box pt={5} px={5}>
                <Text
                  fontSize={{ base: "md", sm: "md", lg: "xl" }}
                  fontWeight="500"
                >
                  You briefly exchange information, hit follow. The reality is
                  that most new relationships end here.
                  <br />
                  <br />
                </Text>
                <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
                  Stop missing out on relationships.
                </Text>
                <Text
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="bold"
                  bgClip="text"
                  bgGradient="linear(to-tr, mintro.200, mintro.400)"
                >
                  Meet People Better.
                </Text>
              </Box>
            </Stack>

            <Box
              flex="1"
              textAlign={{ base: "center", xl: "unset" }}
              rounded="full"
              pb={{ base: "10%", md: 0 }}
            >
              <Parallax>
                <Heading
                  fontSize={{ base: "8xl", md: "9xl" }}
                  bgClip="text"
                  bgGradient="linear(to-tr, mintro.200, mintro.400)"
                >
                  54%
                </Heading>
                <Box w="100%">
                  <Heading
                    mx="auto"
                    maxW={{ base: "unset", lg: "2xl" }}
                    fontWeight="600"
                    fontSize={{ base: "2xl", md: "3xl" }}
                    color="dark.500"
                  >
                    of Americans say they feel that no one knows them well{" "}
                    <sup
                      style={{
                        fontSize: 12,
                        verticalAlign: "text-top",
                        top: "10px",
                        left: "-5px",
                      }}
                    >
                      1
                    </sup>
                  </Heading>
                </Box>
              </Parallax>
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
