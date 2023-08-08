import React from "react";
import { Button } from "../button";
import { Pencil } from "lucide-react";
import ContentHeader from "./content-header";
import ContentBody from "./content-body";
import ContentSection from "./content-section";
import ContentWrapper from "./content-wrapper";
import FormArea from "./form-area";

const SettingPage = () => {
  const fields = [
    { name: "Full address", type: "text" },
    { name: "City", type: "text" },
    { name: "Province", type: "text" },
    { name: "Postal code", type: "text" },
    { name: "Phone", type: "text" },
    { name: "Recipient name", type: "text" },
  ];

  return (
    <div className="w-full flex justify-center">
      <ContentSection aria-label="Content wrapper">
        <ContentWrapper aria-label="User's profile">
          <ContentHeader title="Profile" />
          <ContentBody>
            <div className="flex py-2 justify-center items-center gap-[10px] self-stretch">
              <div className="flex-1">
                <p>Username</p>
              </div>
              <div className="flex-1">
                <p>John Doe</p>
              </div>
            </div>
            <div className="flex py-2 justify-center items-center gap-[10px] self-stretch">
              <div className="flex-1">
                <p>Email</p>
              </div>
              <div className="flex-1">
                <p>johndoe@email.com</p>
              </div>
            </div>
          </ContentBody>
          <Button
            variant="outline"
            className="gap-2 rounded-lg border-body-primary"
          >
            <span>
              <Pencil size={18} />
            </span>
            <span>Change Password</span>
          </Button>
        </ContentWrapper>
        <ContentWrapper aria-label="User's Address">
          <ContentHeader title="Address" />
          <ContentBody>
            <FormArea fields={fields} />
          </ContentBody>
        </ContentWrapper>
      </ContentSection>
    </div>
  );
};

export default SettingPage;
