import React, { ReactNode } from "react";

interface FormContainerProps {
  header: ReactNode;
  divider: ReactNode;
  altButton: ReactNode;
  footer: ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({
  header,
  divider,
  altButton,
  footer,
}) => {
  return (
    <div
      className="
        flex
        w-[344px]
        p-4
        flex-col
        items-start
        gap-6
        rounded-md
        bg-white
        shadow-section
        "
    >
      <div className="header w-full">{header}</div>

      <div className="form-wrapper"></div>
      <div className="divider w-full">{divider}</div>

      <div className="alternative-btn w-full">{altButton}</div>

      <div className="footer w-full">{footer}</div>
    </div>
  );
};

export default FormContainer;
