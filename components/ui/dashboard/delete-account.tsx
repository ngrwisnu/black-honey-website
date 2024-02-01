import React from "react";
import ContentSection from "./content-section";
import ContentHeader from "./content-header";
import ContentBody from "./content-body";
import { Button } from "../button";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import ContentWrapper from "./content-wrapper";

const DeleteAccount = () => {
  const deleteHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <ContentSection
      aria-label="delete account container"
      className="border border-red-500 bg-rose-50"
    >
      <ContentWrapper>
        <ContentHeader title="Delete this account" />
        <ContentBody>
          <p>
            Deleting the account will permanently delete all data, including the
            purchase history.
          </p>
          <Button
            variant="destructive"
            className="mt-4 gap-2 rounded-lg text-white"
            onClick={deleteHandler}
          >
            <span>
              <Trash2 size={18} />
            </span>
            <span>Delete account</span>
          </Button>
        </ContentBody>
      </ContentWrapper>
    </ContentSection>
  );
};

export default DeleteAccount;
