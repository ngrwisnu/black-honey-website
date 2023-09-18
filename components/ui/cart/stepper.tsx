"use client";

import React from "react";
import Step from "./step";

interface StepperProps {
  currentStep: number;
}

const Stepper = ({ currentStep }: StepperProps) => {
  const steps = [{ label: "1" }, { label: "2" }, { label: "3" }];

  return (
    <div className="stepper-wrapper pt-34 mb-14 flex w-full items-center justify-center p-4">
      <ol className="flex w-full max-w-[400px] shrink-0 items-center md:w-[400px]">
        {steps.map((step, index) => (
          <li
            key={step.label}
            className={`flex items-center ${
              index !== 0 ? "flex-1" : "flex-none"
            }`}
          >
            {index > 0 ? (
              <div className="flex flex-1 items-center self-stretch pt-5">
                <span
                  className={`h-[1px] w-full self-stretch ${
                    index <= currentStep ? "bg-[#05E142]" : "bg-[#D9D9D9]"
                  }`}
                ></span>
              </div>
            ) : (
              ""
            )}
            <Step
              variant={
                index === currentStep
                  ? "active"
                  : index < currentStep
                  ? "done"
                  : "disabled"
              }
              label={steps[index].label}
            />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Stepper;
