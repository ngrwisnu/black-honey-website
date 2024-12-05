import { Check } from "lucide-react";
import React from "react";

interface StepProps {
  variant: "disabled" | "active" | "done";
  label?: string;
}

const Step: React.FC<StepProps> = ({ variant, label }) => {
  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="42"
        viewBox="0 0 48 42"
        fill="none"
      >
        <path
          d="M34.8453 2L45.6906 20.7846L34.8453 39.5692H13.1547L2.3094 20.7846L13.1547 2H34.8453Z"
          fill={`
            ${variant === "disabled" ? "#E5E7EB" : ""}
            ${variant === "active" ? "#FFF4EB" : ""}
            ${variant === "done" ? "#BEFED0" : ""}
          `}
          stroke={`
          ${variant === "active" ? "#FB8B28" : ""}
          ${variant === "done" ? "#05E142" : ""}
        `}
          strokeWidth={`
          ${variant === "disabled" ? "0" : "4"}
        `}
          data-testid="step-path"
        />
      </svg>
      <span
        className={`absolute 
        ${variant === "done" ? "left-3" : "left-[19px]"} 
        ${variant === "done" ? "top-[9px]" : ""} 
        ${variant === "done" ? "bottom-0" : "bottom-2"} 
        ${
          variant === "disabled" ? "text-gray-400" : "text-body-primary"
        } text-lg`}
      >
        {variant === "done" ? <Check /> : label}
      </span>
    </div>
  );
};

export default Step;
