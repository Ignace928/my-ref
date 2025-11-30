"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { OwnerSchema, OwnerType } from "@/src/lib/Model/Owner";
import { useLoginVM } from "./useLoginVM";
import { Label } from "../ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

export function LoginForm() {
  const { register, handleSubmit, formState:{errors}, reset } = useForm<OwnerType>({
    resolver: zodResolver(OwnerSchema),
  });

  const { login, isLoading } = useLoginVM();

  const onSubmit: SubmitHandler<OwnerType> = (data) => {
    login(data);
    reset()
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="">
        <CardHeader className="text-center">
          <CardTitle>Login</CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div>
                  <Label>Email</Label>
                  <Input type="email" {...register("email")} className="mt-2" />
                  {errors.email && (
                    <p className="text-destructive text-sm">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label>Password</Label>
                  <Input type="password" {...register("password")} className="mt-2" />
                  {errors.password && (
                    <p className="text-destructive text-sm">{errors.password.message}</p>
                  )}
                </div>

                <CardFooter className="flex gap-2">
                  <Button type="submit" disabled={isLoading} className="">
                    {isLoading ? "Connexion..." : "Se connecter"}
                  </Button>
                  <Button className="rounded-full w-10 h-10 outline bg-secondary border cursor-pointer border-primary">🎁</Button>
                </CardFooter>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
