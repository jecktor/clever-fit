import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { update, ref } from "firebase/database";
import { db } from "@lib/firebase";
import type { User } from "@types";

import { useToast } from "@components/ui/use-toast";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@components/ui/dialog";

interface FormInput {
  name: string;
}

interface EditUserProps {
  user: User;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  onUpdate: () => void;
}

export function EditUser({
  user,
  dialogOpen,
  setDialogOpen,
  onUpdate,
}: EditUserProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormInput>();
  const { toast } = useToast();

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    if (user.locker) {
      update(ref(db, `lockers/entries/${user.locker}`), {
        tenant: data.name,
      });
    }

    update(ref(db, `users/${user.id}`), data)
      .then(() => {
        setDialogOpen(false);
        onUpdate();

        toast({ title: "User updated" });
      })
      .catch((error) =>
        toast({ title: "Credentials error", description: error.message }),
      );
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update the user's information.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="w-full flex flex-col gap-4">
            <div className="grid gap-2">
              <Label>Name</Label>
              {errors.name && (
                <span className="text-red-500 text-sm">
                  This field is required.
                </span>
              )}
              <Input
                {...register("name", { required: true })}
                type="text"
                placeholder={user.name}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-fit">
              Confirm
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
