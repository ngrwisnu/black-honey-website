"use client";

import { addressSchema } from "@/validations/address-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
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
import { Check, Plus } from "lucide-react";
import { AddressType, FetchResponse } from "@/types/types";
import { useAddAddress } from "@/hooks/useAddAddress";
import Swal from "sweetalert2";
import AddressList from "./address-list";

interface FormAreaProps {
  fields: { name: string; type: string }[];
  addresses: AddressType[];
}

const formatField = (fieldName: string) => {
  return fieldName.toLowerCase().replace(/\s/g, "_");
};

const FormArea = ({ fields, addresses }: FormAreaProps) => {
  const [addressList, setAddressList] = useState<AddressType[]>([]);

  const { mutate } = useAddAddress();

  useEffect(() => {
    if (addresses) {
      setAddressList(addresses);
    }
  }, [addresses]);

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
  });

  const submitHandler = (data: z.infer<typeof addressSchema>) => {
    mutate(data, {
      onSuccess: (data) => {
        if (!data?.isError) {
          Swal.fire({ icon: "success", title: "Success added new address" });
        } else {
          Swal.fire({ icon: "error", title: data.data });
        }
      },
    });

    console.log(data);
  };

  if (addressList.length !== 0) {
    return (
      <>
        <div className="flex w-full justify-center rounded-lg border-2 border-dashed border-gray-900">
          <Button variant="ghost" className="w-full gap-1">
            <Plus />
            Add new
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          {addressList.map((item) => (
            <AddressList item={item} key={item.id} />
          ))}
        </div>
      </>
    );
  }

  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(submitHandler)}
        className="w-full"
      >
        {fields?.map((item) => (
          <FormField
            key={item.name}
            control={form.control}
            // @ts-ignore
            name={formatField(item.name)}
            render={({ field }) => (
              <FormItem className="py-2">
                <FormLabel className="text-lg">{item.name}</FormLabel>
                <FormControl className="mt-[10px]">
                  <Input
                    {...field}
                    type={item.type}
                    className="border-gray-200 text-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button variant="outline" className="mt-6 gap-2 border-body-primary">
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
