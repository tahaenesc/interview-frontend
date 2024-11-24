"use client";

import { Category } from "@prisma/client";
import React, { ReactNode } from "react";
import { DeleteCategory } from "../_actions/categories";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface Props {
  trigger: ReactNode;
  category: Category;
}

function DeleteCategoryDialog({ category, trigger }: Props) {
  const categoryIdentifier = `${category.name}-${category.type}`;

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: DeleteCategory,
    onSuccess: async () => {
      toast.success("Category deleted succesfully", {
        id: categoryIdentifier,
      });
      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: categoryIdentifier,
      });
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>
                
            </AlertDialogTitle>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteCategoryDialog;
