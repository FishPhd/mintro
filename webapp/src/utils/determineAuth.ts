import { useToast } from "@chakra-ui/react";
import router from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "./isServer";

export const determineAuth = () => {
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
  }, [loading, data, router, toast]);
};

export const determineIfUser = (UserId: number) => {
  const toast = useToast();
  const { data, loading } = useMeQuery();

  useEffect(() => {
    if (!data?.me && !loading && !isServer()) {
      console.log("Not Logged in!");
    } else if (data?.me?.id !== UserId && !loading && !isServer()) {
      console.log("Not authorized!");
    }
    console.log("UserId", data?.me?.id);
  }, [loading, data, router, toast]);
};
