"use client";

import React from "react";
import FormContainer from "./form-container";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "@/validations/auth-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Input } from "../input";
import { CheckCircle2 } from "lucide-react";
import { Button } from "../button";
import { useRegister } from "@/hooks/useAuth";
import { FetchResponse } from "@/types/types";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();

  const { mutate } = useRegister();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const watchPassword = form.watch("password");

  const onRegisterSuccess = (data: FetchResponse | undefined) => {
    if (!data?.isError) {
      router.push("/login");
    }
  };

  const submitHandler = (data: z.infer<typeof registerSchema>) => {
    mutate(data, {
      onSuccess: onRegisterSuccess,
    });
  };

  const formContent = (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(submitHandler)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your fullname"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormDescription
                className={`${
                  /[A-Za-z0-9]{6,}/.test(watchPassword)
                    ? "text-green-500"
                    : "text-slate-400"
                } flex items-center gap-1`}
              >
                <CheckCircle2 size={18} /> Must be 6 or more characters long
              </FormDescription>
              <FormDescription
                className={`${
                  /\d+/.test(watchPassword)
                    ? "text-green-500"
                    : "text-slate-400"
                } flex items-center gap-1`}
              >
                <CheckCircle2 size={18} /> Must contains 1 or more numbers
              </FormDescription>
              <FormDescription
                className={`${
                  /[A-Z]+/.test(watchPassword)
                    ? "text-green-500"
                    : "text-slate-400"
                } flex items-center gap-1`}
              >
                <CheckCircle2 size={18} /> Must contains 1 or more capital
                letters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="success" className="mt-2 w-full">
          Register
        </Button>
      </form>
    </Form>
  );

  return (
    <>
      <FormContainer
        title="Create an account"
        description="Welcome to the Black Honey Website"
        formContent={formContent}
        footerText="Already have an account?"
      />
    </>
  );
};

export default RegisterPage;
