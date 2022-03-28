import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useMeQuery } from "../graphql/generated/graphql";
import { isServer } from "./isServer";

export const useDetermineAuth = () => {
  const toast = useToast();
  const { data, loading } = useMeQuery();

  useEffect(() => {
    if (!data?.me && !loading && !isServer()) {
      toast({
        description: `Not logged in!`,
        status: "error",
        duration: 1500,
      });
      // router.replace("/login?redirect=" + router.pathname);
    }
  }, [loading, data, toast]);
};

export const useDetermineIfUser = (UserId: number) => {
  const { data, loading } = useMeQuery();

  useEffect(() => {
    if (!data?.me && !loading && !isServer()) {
      console.log("Not Logged in!");
    } else if (data?.me?.id !== UserId && !loading && !isServer()) {
      console.log("Not authorized!");
    }
  }, [loading, data, UserId]);
};
