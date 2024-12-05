"use client";

import React, { useState } from "react";
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
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [registerValid, setIsRegisterValid] = useState({
    isError: false,
    message: "",
  });

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
    if (data?.isError) {
      setIsRegisterValid({
        isError: true,
        message: data.data.message,
      });
    } else {
      router.push("/login");
    }
  };

  const submitHandler = (data: z.infer<typeof registerSchema>) => {
    mutate(data, {
      onSuccess: onRegisterSuccess,
    });
  };

  const showPasswordHandler = () => {
    setIsPasswordShow(!isPasswordShow);
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
                <Input type="text" placeholder='e.g. "John Doe"' {...field} />
              </FormControl>
              <FormMessage data-testid="error-message" />
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
                <Input
                  type="email"
                  placeholder='e.g. "example@email.com"'
                  {...field}
                />
              </FormControl>
              <FormMessage data-testid="error-message" />
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
                <div className="relative overflow-y-hidden">
                  <Input
                    id="password-field"
                    type={isPasswordShow ? "text" : "password"}
                    placeholder="Enter your password"
                    {...field}
                  />
                  <div
                    onClick={showPasswordHandler}
                    className={`absolute right-2 transition-all duration-300 ${
                      isPasswordShow ? "-top-full" : "top-0"
                    } h-full text-sm text-slate-500 hover:cursor-pointer`}
                    aria-label={
                      isPasswordShow ? "show-password" : "hide-password"
                    }
                    data-testid="password-visibility"
                  >
                    <div className="flex h-full items-center">Show</div>
                    <div className="flex h-full items-center">Hide</div>
                  </div>
                </div>
              </FormControl>
              <FormDescription className="text-slate-400">
                Must contains at least:
              </FormDescription>
              <FormDescription
                className={`${
                  /[A-Za-z0-9]{6,}/.test(watchPassword)
                    ? "text-green-500"
                    : "text-slate-400"
                } flex items-center gap-1`}
              >
                <CheckCircle2 size={18} /> 6 or more characters long
              </FormDescription>
              <FormDescription
                className={`${
                  /\d+/.test(watchPassword)
                    ? "text-green-500"
                    : "text-slate-400"
                } flex items-center gap-1`}
              >
                <CheckCircle2 size={18} /> 1 or more numbers
              </FormDescription>
              <FormDescription
                className={`${
                  /[A-Z]+/.test(watchPassword)
                    ? "text-green-500"
                    : "text-slate-400"
                } flex items-center gap-1`}
              >
                <CheckCircle2 size={18} /> 1 or more capital letters
              </FormDescription>
              <FormMessage data-testid="error-message" />
            </FormItem>
          )}
        />
        <Button type="submit" variant="default" className="mt-2 w-full">
          Register
        </Button>
      </form>
    </Form>
  );

  return (
    <FormContainer
      title="Create an account"
      description="Welcome to the Black Honey Website"
      formContent={formContent}
      footerText="Already have an account?"
      loginValid={registerValid}
    />
  );
};

export default RegisterPage;
