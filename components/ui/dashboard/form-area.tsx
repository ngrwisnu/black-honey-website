"use client";

import { addressSchema } from "@/validations/address-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
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
import { Check } from "lucide-react";

const FormArea = ({ fields }: { fields: string[] }) => {
  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      full_address: "",
      city: "",
      province: "",
      postal_code: "",
      phone: "",
      recipient_name: "",
    },
  });

  const submitHandler = (data: z.infer<typeof addressSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(submitHandler)}
        className="w-full"
      >
        {fields.map((item) => (
          <FormField
            key={item}
            control={form.control}
            name={item.toLowerCase().replace(/\s/g, "_")}
            render={({ field }) => (
              <FormItem className="py-2">
                <FormLabel className="text-lg">{item}</FormLabel>
                <FormControl className="mt-[10px]">
                  <Input {...field} className="text-lg border-gray-200" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button variant="outline" className="border-body-primary gap-2 mt-6">
          <span>
            <Check size={18} />
          </span>
          <span>Save Changed</span>
        </Button>
      </form>
    </Form>
  );
};

export default FormArea;
