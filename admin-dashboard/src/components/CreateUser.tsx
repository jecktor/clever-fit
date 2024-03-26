import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { set, ref } from "firebase/database";
import { userAuth, db } from "@lib/firebase";

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
  email: string;
  password: string;
}

export function CreateUser() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormInput>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    createUserWithEmailAndPassword(userAuth, data.email, data.password)
      .then(async (credentials) => {
        await set(ref(db, `users/${credentials.user.uid}`), {
          access: false,
          name: data.name,
          email: data.email,
          role: "user",
        });

        userAuth.signOut();

        setDialogOpen(false);

        toast({ title: "User created" });
      })
      .catch((error) =>
        toast({ title: "Credentials error", description: error.message }),
      );
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <Button onClick={() => setDialogOpen(true)}>Create User</Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription>Add a new user to the system.</DialogDescription>
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
                placeholder="John Smith"
              />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              {errors.email && (
                <span className="text-red-500 text-sm">
                  This field is required.
                </span>
              )}
              <Input
                {...register("email", { required: true })}
                type="email"
                placeholder="email@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label>Password</Label>
              {errors.password && (
                <span className="text-red-500 text-sm">
                  This field is required.
                </span>
              )}
              <Input
                {...register("password", { required: true })}
                type="password"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-fit">
              Create User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
