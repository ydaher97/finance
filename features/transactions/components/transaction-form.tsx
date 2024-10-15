import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { insertTransactionsSchema } from "@/db/schema";
import { Select } from "@/components/select";
import { DatePicker } from "@/components/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { AmountInput } from "@/components/amount-input";
import { convertAmountToMiliunits } from "@/lib/utils";

const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  amount: z.string(),
  notes: z.string().nullable().optional(),
});

const apiSchema = insertTransactionsSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;
type apiFormValues = z.input<typeof apiSchema>;

type Props = {
  id?: string;
  defultValues?: FormValues;
  onSubmit: (values: apiFormValues) => void;
  onDelete?: () => void;
  disabeld?: boolean;
  accountOptions: { label: string; value: string }[];
  categoryOptions: { label: string; value: string }[];
  onCreateAccount: (name: string) => void;
  onCreateCategory: (name: string) => void;
};

export const TransactionForm = ({
  id,
  defultValues,
  onSubmit,
  onDelete,
  disabeld,
  accountOptions,
  categoryOptions,
  onCreateAccount,
  onCreateCategory,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defultValues,
  });

  const handleSubmit = (values: FormValues) => {
    const amountInMiliunits = convertAmountToMiliunits(
      parseFloat(values.amount)
    );

    onSubmit({
      ...values,
      amount: amountInMiliunits,
      notes: values.notes ?? "",
    });
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          name="payee"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>payee</FormLabel>
              <FormControl>
                <Input
                  disabled={disabeld}
                  placeholder="add a payee"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={field.disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="accountId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>account</FormLabel>
              <FormControl>
                {/* <Input
                  disabled={disabeld}
                  placeholder="e.g. Cash , Bank ,credit card"
                  {...field}
                /> */}
                <Select
                  placholder="select an account"
                  disabeled={disabeld}
                  onChange={field.onChange}
                  options={accountOptions}
                  onCreate={onCreateAccount}
                  value={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="categoryId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>category</FormLabel>
              <FormControl>
                <Select
                  placholder="select a category"
                  disabeled={disabeld}
                  onChange={field.onChange}
                  options={categoryOptions}
                  onCreate={onCreateCategory}
                  value={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="notes"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>notes</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  disabled={disabeld}
                  placeholder="notes"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <AmountInput
                  {...field}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabeld}
                  placeholder="amount"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={disabeld} className="w-full">
          {id ? "Save changes" : "Create transacion"}
        </Button>
        {!!id && (
          <Button
            type="button"
            disabled={disabeld}
            onClick={handleDelete}
            variant="outline"
            className="w-full"
          >
            <Trash className="size-4 mr-2" />
            Delete transaction
          </Button>
        )}
      </form>
    </Form>
  );
};
