import {
  Box,
  Text,
  Button,
  Flex,
  Heading,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import Card from "./Card";
import Parallax from "./Parallax";

export function ProblemStatement() {
  return (
    <>
      <Box as="section" mb={{ base: "0%", lg: "5%" }}>
        <Box
          maxW={{ base: "xl", md: "7xl" }}
          mx="auto"
          px={{ base: "6", lg: "0" }}
        >
          <Stack
            spacing={{ base: "5", lg: "20" }}
            direction={{ base: "column-reverse", lg: "row" }}
          >
            <Stack flex="1" textAlign={{ base: "center", md: "unset" }}>
              <Card
                shadow="lg"
                h="-webkit-fit-content"
                maxW={{ base: "3xl", lg: "3xl" }}
                w={{ base: "auto", lg: "3xl" }}

              >
                <Heading fontWeight="600" fontSize={{ base: "xl", md: "3xl" }}>
                  Let&apos;s face it...{" "}
                </Heading>
                <Heading fontSize={{ base: "3xl", md: "4xl" }} color="dark.500">
                  Real Introductions are Rare
                </Heading>
              </Card>
              <Box pt={5} px={5}>
                <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="500">
                  You briefly exchange information, hit follow. The reality is that most new relationships end
                  here.
                  <br />
                  <br />
                </Text>
                <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
                  Stop missing out on relationships.  <br />
                  Meet People Better.
                </Text>
              </Box>
            </Stack>

            <Box
              flex="1"
              // textAlign={{ base: "center", md: "unset" }}
              rounded="full"
              maxW={{ lg: "2xl" }}
              // p={10}
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
              
              <Heading fontWeight="600" fontSize={{ base: "2xl", md: "3xl" }} color="dark.500">
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
              </Parallax>
            </Box>
          </Stack>
        </Box>
      </Box >
    </>
  );
}
