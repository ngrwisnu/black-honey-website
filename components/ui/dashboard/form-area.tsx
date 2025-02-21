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
import { AddressType } from "@/types/types";
import { useAddAddress } from "@/hooks/useAddAddress";
import Swal from "sweetalert2";
import AddressList from "./address-list";
import { useToken } from "@/hooks/useToken";
import { useRouter } from "next/navigation";
import { sanitizeFormData } from "@/lib/utils";

interface FormAreaProps {
  fields: { name: string; type: string }[];
  addresses: AddressType[];
}

const formatField = (fieldName: string) => {
  return fieldName.toLowerCase().replace(/\s/g, "_");
};

const FormArea = ({ fields, addresses }: FormAreaProps) => {
  const [addressList, setAddressList] = useState<AddressType[]>([]);
  const [isNewAddressClicked, setIsNewAddressClicked] =
    useState<boolean>(false);

  const router = useRouter();

  const { token } = useToken();

  const { mutate } = useAddAddress();

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
  });

  useEffect(() => {
    if (addresses) {
      setAddressList(addresses);
    }
  }, [addresses]);

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form.formState.isSubmitSuccessful]);

  const submitHandler = (data: z.infer<typeof addressSchema>) => {
    const cleanData = sanitizeFormData(data);

    const required = {
      data: cleanData,
      token,
    };

    mutate(required, {
      onSuccess: async (data) => {
        if (!data?.isError) {
          Swal.fire({
            icon: "success",
            title: "Successfully adding a new address",
          });

          setIsNewAddressClicked(false);
          router.refresh();
        } else {
          Swal.fire({ icon: "error", title: data.data });
        }
      },
    });
  };

  const newAddressHandler = () => {
    setIsNewAddressClicked(true);
  };

  if (addressList.length !== 0 && !isNewAddressClicked) {
    return (
      <>
        <div className="flex w-full justify-center rounded-lg border-2 border-dashed border-gray-900">
          <Button
            variant="ghost"
            className="w-full gap-1"
            onClick={newAddressHandler}
          >
            <Plus />
            Add new
          </Button>
        </div>
        <div data-testid="addresses" className="mt-4 flex flex-wrap gap-4">
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
        <div className="mt-6 flex w-full items-center gap-4">
          <Button
            type="submit"
            variant="default"
            className="gap-2 border-body-primary"
          >
            <span>
              <Check size={18} />
            </span>
            <span>Save Changed</span>
          </Button>
          {addressList.length !== 0 && (
            <Button
              variant="outline"
              onClick={() => setIsNewAddressClicked(false)}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default FormArea;
