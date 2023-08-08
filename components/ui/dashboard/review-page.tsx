"use client";

import React from "react";
import ContentSection from "./content-section";
import ContentWrapper from "./content-wrapper";
import ContentHeader from "./content-header";
import ContentBody from "./content-body";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { reviewSchema } from "@/validations/review-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Textarea } from "../textarea";
import { Button } from "../button";
import { Check } from "lucide-react";

const ReviewPage = () => {
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      message: "",
    },
  });

  const submitHandler = (data: z.infer<typeof reviewSchema>) => {
    console.log(data);
  };

  return (
    <div className="w-full flex justify-center">
      <ContentSection aria-label="Review section">
        <ContentWrapper>
          <ContentHeader title="Review" />
          <ContentBody>
            <Form {...form}>
              <form
                action=""
                onSubmit={form.handleSubmit(submitHandler)}
                className="w-full"
              >
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">
                        What is your opinion about our product?
                      </FormLabel>
                      <FormControl className="mt-[10px]">
                        <Textarea
                          {...field}
                          placeholder="We'd love to hear your thoughts"
                          className="resize-none sm:w-1/2 text-lg border-gray-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  variant="outline"
                  className="border-body-primary gap-2 mt-6"
                >
                  <span>
                    <Check size={18} />
                  </span>
                  <span>Submit</span>
                </Button>
              </form>
            </Form>
          </ContentBody>
        </ContentWrapper>
      </ContentSection>
    </div>
  );
};

export default ReviewPage;
