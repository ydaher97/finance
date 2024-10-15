import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResopnseType = InferResponseType<typeof client.api.transactions.$post>;
type RequestType = InferRequestType<
  typeof client.api.transactions.$post
>["json"];

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResopnseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions.$post({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("transaction created");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: () => {
      toast.error("faield to create account");
    },
  });

  return mutation;
};
