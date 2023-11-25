"use client";

import React, { useEffect, useState } from "react";
import ContentSection from "./content-section";
import ContentWrapper from "./content-wrapper";
import ContentHeader from "./content-header";
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
import { usePostReview } from "@/hooks/usePostReview";
import Swal from "sweetalert2";
import { FetchResponse } from "@/types/types";
import { useToken } from "@/hooks/useToken";
import DashboardError from "./error";
import dynamic from "next/dynamic";

const ContentBody = dynamic(() => import("./content-body"));

const ReviewPage = ({ review }: { review: FetchResponse | undefined }) => {
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState<[] | undefined>([]);

  const token = useToken();

  useEffect(() => {
    if (review && !review.isError) {
      setReviews(review.data.data);
    } else {
      setReviews(undefined);
    }
  }, [review]);

  const { mutate } = usePostReview();

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      message: "",
    },
  });

  const submitHandler = (data: z.infer<typeof reviewSchema>) => {
    const reviewData = {
      rating,
      message: data.message!,
    };

    const required = {
      data: reviewData,
      token,
    };

    mutate(required);

    Swal.fire({
      title: "Thank you for your Review",
      icon: "success",
    });
  };

  if (!reviews) {
    return <DashboardError />;
  }

  if (reviews.length !== 0) {
    return (
      <div className="flex w-full items-center justify-center">
        <div className="w-full rounded-lg border-2 border-dashed border-green-600 bg-green-100 p-4 text-center text-green-600 sm:w-4/5">
          <p>
            <strong>Thank you for the review!</strong>
          </p>
          <p className="w-full sm:mx-auto sm:w-2/3">
            Your review helps us understand your needs better and ensures we
            continue to deliver the best products and services.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center">
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
                        <div className="flex w-full gap-2 sm:w-4/5">
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
                              className="fill-yellow-500 stroke-0"
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
                          className="resize-none border-gray-200 text-lg sm:w-4/5"
                          rows={6}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  variant="outline"
                  className="mt-6 gap-2 border-body-primary"
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
