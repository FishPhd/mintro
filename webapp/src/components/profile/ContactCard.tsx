import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaSnapchatGhost,
  FaInstagram,
  FaTiktok,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import Card from "../general/Card";

// import * as Icons from "react-icons/fa";

/* Your icon name from database data can now be passed as prop */
// const DynamicFaIcon = ({ name }) => {
//   const IconComponent = Icons[name];

//   if (!IconComponent) {
//     // Return a default one
//     return <Icons.FaBeer />;
//   }

//   return <IconComponent />;
// };

export const ContactCard = () => (
  <AnimatePresence presenceAffectsLayout>
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.75 }}
    >
      <Card
        fontWeight="800"
        color="dark.500"
        pt={5}
        fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
      >
        social
        <Box>
          <Stack direction={"row"} pl={0} alignItems={"flex-start"}>
            <Button
              size="md"
              variant="ghost"
              colorScheme={"mintro"}
              _hover={{ opacity: "60%" }}
              leftIcon={
                <>
                  {" "}
                  <svg width="0" height="0">
                    <linearGradient id="instagram" x1="100%" y1="100%">
                      <stop stopColor="#7a6ded" offset="0%" />
                      <stop stopColor="#591885" offset="100%" />
                    </linearGradient>
                  </svg>
                  <FaInstagram
                    size="20px"
                    style={{ fill: "url(#instagram)" }}
                  />{" "}
                </>
              }
            >
              <Text
                // bgGradient="linear(to-l, #7a6ded, #591885)"
                // bgClip="text"
                color={"black"}
                fontWeight="extrabold"
                fontSize={"sm"}
              >
                /u/user
              </Text>
            </Button>
            <Button
              size="md"
              variant="ghost"
              colorScheme={"mintro"}
              _hover={{ opacity: "80%" }}
              leftIcon={<FaTiktok size="20px" style={{ fill: "black" }} />}
            >
              <Text color={"dark.500"} fontWeight="extrabold" fontSize={"sm"}>
                /u/user
              </Text>
            </Button>
            <Button
              size="md"
              variant="ghost"
              colorScheme={"mintro"}
              _hover={{ opacity: "60%" }}
              leftIcon={
                <>
                  <FaSnapchatGhost
                    size="20px"
                    stroke="black"
                    strokeWidth={"20px"}
                    fill="yellow"
                  />
                </>
              }
            >
              <Text
                bgClip="text"
                color={"dark.500"}
                fontWeight="extrabold"
                fontSize={"sm"}
              >
                /u/user
              </Text>
            </Button>
          </Stack>
        </Box>
        <Text pt={5}>contact</Text>
        <Box>
          <Stack direction={"row"} pl={0} alignItems={"flex-start"}>
            <Button
              size="md"
              variant="ghost"
              colorScheme={"mintro"}
              _hover={{ opacity: "60%" }}
              leftIcon={<FaPhoneAlt style={{ fill: "black" }} size="20px" />}
            >
              <Text
                pl={1}
                // bgGradient="linear(to-l, #7a6ded, #591885)"
                // bgClip="text"
                color={"dark.500"}
                fontWeight="extrabold"
                fontSize={"sm"}
              >
                phone
              </Text>
            </Button>
            <Button
              size="md"
              variant="ghost"
              colorScheme={"mintro"}
              _hover={{ opacity: "80%" }}
              leftIcon={<FaEnvelope size="20px" style={{ fill: "black" }} />}
            >
              <Text
                pl={1}
                color={"dark.500"}
                fontWeight="extrabold"
                fontSize={"sm"}
              >
                email
              </Text>
            </Button>
          </Stack>
        </Box>
      </Card>
    </motion.div>
  </AnimatePresence>
);

export default ContactCard;
