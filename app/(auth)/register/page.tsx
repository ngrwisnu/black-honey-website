"use client";

import FormContainer from "@/components/ui/auth/form-container";
import { registerSchema } from "@/validations/auth-form";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Register = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  const submitHandler = (data: z.infer<typeof registerSchema>) => {
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
          name="fullname"
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
              <FormDescription>
                Must contains 1 or more numbers and capital letters
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

export default Register;
