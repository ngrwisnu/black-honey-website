"use client";

import React, { useState } from "react";
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
import { Check, Star } from "lucide-react";
import { Slider } from "../slider";

const ReviewPage = () => {
  const [rating, setRating] = useState(5);

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      message: "",
    },
  });

  const submitHandler = (data: z.infer<typeof reviewSchema>) => {
    console.log({ rating, message: data.message });
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
                className="w-full gap-2"
              >
                <FormField
                  control={form.control}
                  name="rating"
                  render={() => (
                    <FormItem className="py-2">
                      <FormLabel className="text-lg">Ratings</FormLabel>
                      <FormControl className="mt-[10px]">
                        <div className="w-full sm:w-4/5 flex gap-2">
                          <Slider
                            defaultValue={[5]}
                            max={5}
                            step={0.5}
                            onValueChange={(e) => setRating(e[0])}
                          />
                          <span className="flex items-center font-semibold text-yellow-600">
                            {rating}{" "}
                            <Star
                              size={26}
                              className="stroke-0 fill-yellow-500"
                            />
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="py-2">
                      <FormLabel className="text-lg">
                        What is your opinion about our product?
                      </FormLabel>
                      <FormControl className="mt-[10px]">
                        <Textarea
                          {...field}
                          placeholder="We'd love to hear your thoughts"
                          className="resize-none sm:w-4/5 text-lg border-gray-200"
                          rows={6}
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
