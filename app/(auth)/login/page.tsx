"use client";
import React from "react";

import FormContainer from "@/components/ui/auth/form-container";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/validations/auth-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler = (data: z.infer<typeof loginSchema>) => {
    console.log(data);
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
            </FormItem>
          )}
        />
        <Button variant="success" type="submit" className="mt-2 w-full">
          Continue
        </Button>
      </form>
    </Form>
  );

  return (
    <>
      <FormContainer
        title="Welcome"
        description="Please login first before continue"
        formContent={formContent}
        footerText="Don’t have an account?"
      />
    </>
  );
};

export default Login;
