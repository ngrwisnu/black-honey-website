"use client";

import React, { FormEvent, useState } from "react";
import FormContainer from "./form-container";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/validations/auth-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Input } from "../input";
import { Button } from "../button";
import { useLogin, useSessionLogin } from "@/hooks/useAuth";
import { FetchResponse } from "@/types/types";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useToken } from "@/hooks/useToken";
import { sanitizeFormData } from "@/lib/utils";

const LoginPage = () => {
  const [loginValid, setLoginValid] = useState({
    isError: false,
    message: "",
  });

  const router = useRouter();

  const { csrf } = useToken();
  const { mutate, isLoading } = useLogin();
  const { mutate: mutateSessionLogin, isLoading: isSessionLoginLoading } =
    useSessionLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLoginSuccess = (data: FetchResponse | undefined) => {
    if (data?.isError) {
      setLoginValid({
        isError: true,
        message: data.data.message,
      });
    } else {
      setLoginValid({
        isError: false,
        message: "",
      });

      const encodedTk = window.btoa(data?.data.data.token.access);
      Cookies.set("tk", encodedTk, {
        expires: Date.now() + 6 * 60 * 60 * 1000,
      });
      Cookies.set("_tk_csrf", data?.data.data.token.csrf);

      router.push("/");
    }
  };

  const submitHandler = (data: z.infer<typeof loginSchema>) => {
    const cleanData = sanitizeFormData(data);

    mutate(cleanData, {
      onSuccess: onLoginSuccess,
    });
  };

  const updateSessionHandler = async (e: FormEvent) => {
    e.preventDefault();

    mutateSessionLogin(csrf, {
      onSuccess: onLoginSuccess,
    });
  };

  const formContent = !csrf ? (
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
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  {...field}
                />
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
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant="default"
          type="submit"
          disabled={isLoading}
          className="mt-2 w-full"
        >
          Continue
        </Button>
      </form>
    </Form>
  ) : (
    <form onSubmit={updateSessionHandler} className="flex flex-col gap-4">
      <Button
        variant="default"
        type="submit"
        className="mt-2 w-full"
        disabled={isSessionLoginLoading}
      >
        Login
      </Button>
    </form>
  );

  return (
    <FormContainer
      title="Welcome"
      description="Please login first before continue"
      formContent={formContent}
      footerText="Don’t have an account?"
      loginValid={loginValid}
    />
  );
};

export default LoginPage;
