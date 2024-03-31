import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useForm, SubmitHandler } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@lib/firebase";
import { useFirebaseUser } from "@hooks";

import { useToast } from "@components/ui/use-toast";
import { Toaster } from "@components/ui/toaster";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

interface FormInput {
  email: string;
  password: string;
}

export function Login() {
  const user = useFirebaseUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  const [isAdmin, setIsAdmin] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (user && isAdmin) setLocation("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((credentials) => {
        if (credentials.user.email?.endsWith("@adminclever.com"))
          setIsAdmin(true);
        else {
          setIsAdmin(false);
          auth.signOut();

          toast({
            title: "Auth error",
            description: "You are not an admin.",
          });
        }
      })
      .catch((error) =>
        toast({ title: "Credentials error", description: error.message }),
      );
  };

  return (
    <>
      <div className="grid h-screen w-screen place-items-center">
        <Card className="w-full md:w-[400px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Log in</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="grid gap-4">
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
                  placeholder="email@adminclever.com"
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
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full" type="submit">
                Continue
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      <Toaster />
    </>
  );
}
