"use client";

import React, { useState } from "react";
import Modal from "../modal";
import useModal from "@/store/modal-slice";
import { CheckCircle2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { resetPassword } from "@/validations/reset-password";
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
import { Button } from "../button";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import Swal from "sweetalert2";
import { useToken } from "@/hooks/useToken";

const PasswordModal = () => {
  const [isEqual, setIsEqual] = useState(true);

  const token = useToken();

  const modal = useModal();

  const { mutate } = useUpdateProfile();

  const form = useForm<z.infer<typeof resetPassword>>({
    resolver: zodResolver(resetPassword),
    defaultValues: {
      newPassword: "",
      validateNewPassword: "",
    },
  });

  const watchNewPassword = form.watch("newPassword");
  const watchConfirmPassword = form.watch("validateNewPassword");

  const submitHandler = (data: z.infer<typeof resetPassword>) => {
    if (watchNewPassword !== watchConfirmPassword) {
      setIsEqual(false);
    } else {
      const profileData = {
        password: data.newPassword,
      };

      const required = {
        data: profileData,
        token,
      };

      setIsEqual(true);

      mutate(required, {
        onSuccess: (data) => {
          if (data && !data.isError) {
            Swal.fire({
              title: "Success updating the password",
              icon: "success",
            });

            modal.onClose();
          }
        },
      });
    }
  };

  if (!modal.isOpen) {
    return;
  }

  return (
    <Modal overlayHandler={modal.onClose}>
      <div className="w-full p-4">
        <div className="flex justify-end">
          <X onClick={modal.onClose} />
        </div>
        <div className="border-b border-b-gray-900 pb-4 text-2xl">
          <h3>Update Password</h3>
        </div>
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(submitHandler)}
            className="mt-4 flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter the new password"
                      className="border-gray-400"
                      aria-label="password-field"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-slate-400">
                    Must contains at least:
                  </FormDescription>
                  <FormDescription
                    className={`${
                      /[A-Za-z0-9]{6,}/.test(watchNewPassword)
                        ? "text-green-500"
                        : "text-slate-400"
                    } flex items-center gap-1`}
                  >
                    <CheckCircle2 size={18} /> 6 or more characters long
                  </FormDescription>
                  <FormDescription
                    className={`${
                      /\d+/.test(watchNewPassword)
                        ? "text-green-500"
                        : "text-slate-400"
                    } flex items-center gap-1`}
                  >
                    <CheckCircle2 size={18} /> 1 or more numbers
                  </FormDescription>
                  <FormDescription
                    className={`${
                      /[A-Z]+/.test(watchNewPassword)
                        ? "text-green-500"
                        : "text-slate-400"
                    } flex items-center gap-1`}
                  >
                    <CheckCircle2 size={18} /> 1 or more capital letters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="validateNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Your new password"
                      className="border-gray-400"
                      aria-label="confirm-password-field"
                      {...field}
                    />
                  </FormControl>
                  {!isEqual && (
                    <FormDescription
                      className={`${
                        watchNewPassword !== watchConfirmPassword
                          ? "inline-block text-red-500"
                          : "hidden"
                      } flex items-center gap-1`}
                    >
                      Password does not match
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2 w-full sm:ml-auto sm:w-1/3">
              Save
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default PasswordModal;
