import {
  Box,
  Text,
  Button,
  Flex,
  Heading,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import Card from "./Card";

export function ProblemStatement() {
  return (
    <>
      <Box as="section" mb={"5%"}>
        <Box
          maxW={{ base: "xl", md: "7xl" }}
          mx="auto"
          px={{ base: "6", lg: "0" }}
        >
          <Stack
            spacing={{ base: "5", lg: "20" }}
            direction={{ base: "column-reverse", lg: "row" }}
          >
            <Stack flex="1">
              <Card
                shadow="lg"
                h="-webkit-fit-content"
                maxW={{ base: "3xl", lg: "3xl" }}
                w={{ base: "auto", lg: "3xl" }}
              >
                <Heading fontWeight="600" fontSize="3xl">
                  Let&apos;s face it...{" "}
                </Heading>
                <Heading fontSize="5xl" color="dark.500">
                  Real Introductions are Rare
                </Heading>
              </Card>
              <Box pt={5} px={5}>
                <Text fontSize="xl" fontWeight="500">
                  You meet someone new, you briefly exchange information, and
                  hit follow. The reality is that most new relationships end
                  here.
                  <br />
                  <br />
                </Text>
                <Text fontSize="2xl" fontWeight="bold">
                  Stop missing out on relationships. Meet People Better.
                </Text>
              </Box>
            </Stack>

            <Box
              flex="1"
              textAlign={{ base: "center", md: "unset" }}
              rounded="full"
              maxW={{ lg: "2xl" }}
              p={10}
            >
              <Heading
                fontSize={{ base: "8xl", md: "9xl" }}
                bgClip="text"
                bgGradient="linear(to-tr, mintro.200, mintro.400)"
              >
                54%
              </Heading>
              <Heading fontWeight="600" fontSize="3xl" color="dark.500">
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
          </Stack>
        </Box>
      </Box>
    </>
  );
}
