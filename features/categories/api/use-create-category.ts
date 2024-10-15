import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResopnseType = InferResponseType<typeof client.api.categories.$post>;
type RequestType = InferRequestType<typeof client.api.categories.$post>["json"];

export const useCreateCategories = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResopnseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories.$post({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("category created");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error("faield to create category");
    },
  });

  return mutation;
};
