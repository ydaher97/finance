import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResopnseType = InferResponseType<typeof client.api.accounts.$post>;
type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"];

export const useCreateAccounts = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResopnseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts.$post({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("account created");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: () => {
      toast.error("faield to create account");
    },
  });

  return mutation;
};
