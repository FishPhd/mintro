import {
  Avatar,
  Box,
  Heading,
  HStack,
  Icon,
  IconButton,
  IconProps,
  Stack,
  Text,
  useBreakpointValue,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import NextLink from "next/link";
import { IoChevronForwardSharp } from "react-icons/io5";

import {
  AiOutlineArrowRight,
  AiOutlineGift,
  AiOutlineHome,
} from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { Card } from "./Card";
import { TextWithIcon } from "./TextWithIcon";
import { motion, Variants } from "framer-motion";
import { usingApollo } from "../../utils/withApollo";
import { isServer } from "../../utils/isServer";
import { isMobile } from "is-mobile"
import Parallax from "./Parallax";

const mobileVariant: Variants = {
  offscreen: {
    x: -600
  },
  onscreen: {
    x: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1
    }
  }
};

const desktopVariant: Variants = {
  offscreen: {
    y: 300
  },
  onscreen: {
    y: 0,
    rotate: -5,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1
    }
  }
};

export const TemplateHeader = () => (
  <Box as="section" pt={{ base: "20%", md: "5%" }} mb={{ base: "20", md: "40" }}>
    <Box
      mx="auto"
      maxW={{ base: "xl", md: "6xl" }}
      px={{ base: "6", md: "8" }}
    >
      <Heading
        bgClip="text"
        bgGradient="linear(to-tr, mintro.200, mintro.400)"
        fontSize={{ base: "8xl", md: "9xl" }}
        textAlign="center"
        userSelect={"none"}
      >
        Mintro
      </Heading>
      <Text
        pt={2}
        pb={{base: "10%", md: "5%"}}
        fontWeight="500"
        fontSize={{ base: "15", md: "xl" }}
        textAlign="center"
        lineHeight="2"
      >
        Present the most authentic version of yourself
        <br /> Share what you want people to know about you
      </Text>


      <Stack w="100%" spacing={10} direction={{ base: "column", lg: "row" }}>
        <motion.div
          className="card-container"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
        >
          <motion.div className="card" variants={isMobile() ? mobileVariant : desktopVariant}>
            <Parallax>

              <Box flex="1">
                <Card
                  px={0}
                  py={5}
                  boxShadow={"lg"}
                  borderTopWidth="3px"
                  borderColor={"gray.100"}
                  borderTopColor={"mintro.300"}
                >
                  <Stack px={5} direction={{ base: "row", lg: "row" }}>
                    <Avatar size="xl" src={"/templateProfileImage_300x300.webp"} />
                    <Box p="0">
                      <HStack mb={1} align="flex-end" lineHeight="1" spacing="1">
                        <Text fontSize="2xl" fontWeight="bold">
                          Jessica Qiao
                        </Text>
                        <Text fontStyle="italic" color="dark.500" fontSize="md">
                          Jess
                        </Text>
                      </HStack>
                      <Stack direction={{ base: "column-reverse", lg: "row" }}>
                        <Heading color="dark.400" size="xs">
                          she/her/hers
                        </Heading>
                        <Heading color="dark.500" size="xs">
                          Pronounced &quot;{"Ch'iao"}&quot;
                        </Heading>
                      </Stack>
                      <Heading
                        fontStyle="italic"
                        alignSelf="flex-end"
                        color="mintro.500"
                        size="xs"
                        py={2}
                      >
                        I am... an activist
                      </Heading>
                      <Stack
                        direction={{ base: "row", md: "row" }}
                        spacing={{ base: 0, md: 4 }}
                        ml={{ base: "-45%", md: "0" }}
                        pt={2}
                      >
                        <TextWithIcon width={{ base: "35%", md: "auto" }} icon={<MdLocationOn />}>
                          Oakland, California
                        </TextWithIcon>
                        <TextWithIcon width={{ base: "35%", md: "auto" }} icon={<AiOutlineGift />}>
                          July, 10th
                        </TextWithIcon>
                        <TextWithIcon width={{ base: "35%", md: "auto" }} icon={<AiOutlineHome />}>
                          Shenzhen
                        </TextWithIcon>
                      </Stack>
                    </Box>
                  </Stack>
                </Card>

                <Card boxShadow={"lg"} mt={4} pt={4} pb={4}>
                  <Stack spacing="0" lineHeight="1" maxW="3xl">
                    <Box
                      color="dark.500"
                      fontSize={{ base: "md", md: "md", lg: "nd" }}
                    >
                      Top 3
                    </Box>
                    <Box
                      fontWeight="800"
                      color="dark.500"
                      fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
                      pb={2}
                    >
                      Books
                    </Box>

                    <Wrap justify="center">
                      <WrapItem>
                        <Box
                          maxW={{ base: "xs", md: "md", lg: "lg" }}
                          fontWeight={"500"}
                          p={8}
                          rounded="3xl"
                          color="dark.500"
                          textAlign="center"
                          bgGradient="linear(to-tr, mintro.200, mintro.300)"
                        >
                          The Grapes of Wrath
                        </Box>
                      </WrapItem>
                      <WrapItem>
                        <Box
                          maxW={{ base: "xs", md: "md", lg: "lg" }}
                          fontWeight={"500"}
                          p={8}
                          rounded="3xl"
                          color="dark.500"
                          textAlign="center"
                          bgGradient="linear(to-tr, mintro.200, mintro.300)"
                        >
                          1984
                        </Box>
                      </WrapItem>
                      <WrapItem>
                        <Box
                          maxW={{ base: "xs", md: "md", lg: "lg" }}
                          fontWeight={"500"}
                          p={8}
                          rounded="3xl"
                          color="dark.500"
                          textAlign="center"
                          bgGradient="linear(to-tr, mintro.200, mintro.300)"
                        >
                          How to Be an Antiracist
                        </Box>
                      </WrapItem>
                    </Wrap>
                  </Stack>
                </Card>
              </Box>
            </Parallax>

          </motion.div>
        </motion.div>

        <Box
          pl={{ base: "0", lg: "10" }}
          maxW={{ base: "-webkit-min-content", md: "md" }}
          alignSelf="center"
          textAlign={{ base: "center", lg: "unset" }}
        >
          <Heading
            bgClip="text"
            bgGradient="linear(to-tr, mintro.200, mintro.400)"
            fontSize={{ base: "7xl", md: "8xl" }}
            lineHeight="0.9"
            pb={2}
            userSelect={"none"}
          >
            Sound Good?
          </Heading>
          <NextLink href="/register">
            <IconButton
              color="dark.500"
              variant="mintro"
              aria-label="Create your Mintro!"
              rounded="full"
              icon={<>
                <Text fontWeight="800" pl={4} pr={2}>Create your Mintro!</Text>

                <Icon
                  pr={2}
                  boxSize={6}
                  color="dark.500"
                  as={IoChevronForwardSharp}
                />
              </>}
              href={"register"}
            />
          </NextLink>
        </Box>
      </Stack>

    </Box>
  </Box>
);