"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../button";
import { Pencil } from "lucide-react";
import ContentHeader from "./content-header";
import ContentBody from "./content-body";
import ContentSection from "./content-section";
import ContentWrapper from "./content-wrapper";
import FormArea from "./form-area";
import useModal from "@/store/modal-slice";
import { AddressType, FetchResponse } from "@/types/types";

const SettingPage = ({
  addresses,
}: {
  addresses: FetchResponse | undefined;
}) => {
  const [address, setAddress] = useState<AddressType[]>([]);

  const modal = useModal();

  useEffect(() => {
    if (addresses) {
      setAddress(addresses.data.data);
    }
  }, [addresses]);

  const fields = [
    { name: "Full address", type: "text" },
    { name: "City", type: "text" },
    { name: "Province", type: "text" },
    { name: "Phone", type: "text" },
    { name: "Recipient name", type: "text" },
  ];

  return (
    <div className="flex w-full justify-center">
      <ContentSection aria-label="Content wrapper">
        <ContentWrapper aria-label="User's profile">
          <ContentHeader title="Profile" />
          <ContentBody>
            <div className="flex items-center justify-center gap-[10px] self-stretch py-2">
              <div className="flex-1">
                <p>Username</p>
              </div>
              <div className="flex-1">
                <p>John Doe</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-[10px] self-stretch py-2">
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
            onClick={modal.onOpen}
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
            <FormArea fields={fields} addresses={address} />
          </ContentBody>
        </ContentWrapper>
      </ContentSection>
    </div>
  );
};

export default SettingPage;
