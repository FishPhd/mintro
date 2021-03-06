import { FormLabel } from "@chakra-ui/form-control";
import { EditIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { Avatar, Icon, Spinner, Tooltip } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import {
  useAddProfileImageMutation,
  useGetS3SignedUrlMutation,
} from "../../graphql/generated/graphql";

export function formatFilename(filename: string) {
  const date = moment().format("YYYYMMDD");
  const randomString = Math.random().toString(36).substring(2, 7);
  const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const newFilename = `${date}-${randomString}-${cleanFileName}`;
  return newFilename.substring(0, 60);
}

interface UploadFormProps {
  folder: string;
  returnImage?: React.Dispatch<React.SetStateAction<string>>;
  currentImage?: string;
}

export const UploadForm: React.FC<UploadFormProps> = ({
  folder,
  currentImage,
  returnImage,
}) => {
  const [addProfileImage] = useAddProfileImageMutation();
  const [getS3Url] = useGetS3SignedUrlMutation();
  const [fileName, setFileName] = useState("Pick File");

  // const [file, setFile] = useState({} as File);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  return (
    <>
      <FormLabel
        bg="rgba(0, 0, 0, 0.1)"
        cursor="pointer"
        rounded="full"
        _hover={{ background: "mintro.100" }}
        htmlFor="file-upload"
        mb={0}
      >
        {!loading ? (
          <Box
            bg="transparent"
            gridTemplateColumns={"1fr"}
            gridTemplateAreas={"overlap"}
            gridTemplateRows={"1fr"}
            display={"grid"}
            role="group"
          >
            <Icon
              bg="mintro.200"
              rounded={"full"}
              as={EditIcon}
              color="dark.500"
              p={1}
              boxSize={"7"}
              zIndex={"2"}
              gridArea={"overlap"}
              ml={"70%"}
              mt={"70%"}
            />
            <Tooltip placement="top" label="Change Image">
              <Avatar
                alt={"Profile Picture Upload"}
                bg="gray.300"
                opacity={"70%"}
                gridArea={"overlap"}
                _groupHover={{ opacity: "60%" }}
                size="xl"
                src={currentImage ? currentImage : undefined}
                display="block"
              />
            </Tooltip>
          </Box>
        ) : (
          <Box
            bg="transparent"
            gridTemplateColumns={"1fr"}
            gridTemplateAreas={"overlap"}
            gridTemplateRows={"1fr"}
            display={"grid"}
          >
            <Avatar
              alt={"Profile Picture Placeholder"}
              bg="gray.300"
              gridArea={"overlap"}
              opacity={"90%"}
              _hover={{ opacity: "60%" }}
              size="xl"
              display="block"
            />
            <Spinner
              gridArea={"overlap"}
              alignSelf={"center"}
              justifySelf={"center"}
              verticalAlign="middle"
              color="mintro.500"
            />
          </Box>
        )}
        <Input
          id="file-upload"
          type="file"
          style={{ display: "none" }}
          onChange={async (e) => {
            setLoading(true);
            let file = null;
            if (e.target.files && e.target.files.length) {
              file = e.target.files[0];
              await setFileName(file.name);
            }

            if (
              !file ||
              !file.name ||
              (file.type != "image/jpeg" && file.type != "image/png")
            ) {
              toast({
                title: "Invalid File!",
                description:
                  "Does not exist or incorrect type (jpg/png accepted)",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
              setLoading(false);
              return;
            }
            if (file.size > 2e6) {
              toast({
                title: "Invalid File!",
                description: "File size too large (Maximum 2mb)",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
              setLoading(false);
              return;
            }

            const res = await getS3Url({
              variables: {
                filename: formatFilename(fileName),
                folder: folder,
                filetype: file.type,
              },
            });
            const signedRequest = res.data?.getS3SignedUrl.signedRequest;
            const url = res.data?.getS3SignedUrl.url;

            const options = {
              headers: {
                "Content-Type": file.type,
                "x-amz-acl": "public-read",
              },
            };
            if (signedRequest && url) {
              const res = await axios.put(signedRequest, file, options);
              const cdnImageUrl = url.replace(
                "mintro-webapp-images.s3.amazonaws.com/",
                "ik.imagekit.io/wzbi68mgpi3/"
              );
              if (folder == "profiles") {
                await addProfileImage({
                  variables: {
                    imageUrl: cdnImageUrl,
                  },
                });
              } else if (folder == "groups" && returnImage) {
                returnImage(cdnImageUrl);
              }
              if (res.status == 200) {
                toast({
                  title: `Image Uploaded!`,
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
              }
            }
            setLoading(false);
          }}
        />
      </FormLabel>
    </>
  );
};
