import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewCategory } from "../hooks/use-new-categories";
import { CategoriesForm } from "./category-form";
import { z } from "zod";
import { insertCategoriesSchema } from "@/db/schema";
import { useCreateCategories } from "../api/use-create-category";

const formSchema = insertCategoriesSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory();

  const mutation = useCreateCategories();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  console.log(isOpen);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader className="">
          <SheetTitle>new Category</SheetTitle>
          <SheetDescription>create new Category</SheetDescription>
        </SheetHeader>
        <CategoriesForm
          onSubmit={onSubmit}
          disabeld={mutation.isPending}
          defultValues={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  );
};
