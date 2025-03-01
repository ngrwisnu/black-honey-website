import React from "react";
import ContentSection from "./content-section";
import ContentHeader from "./content-header";
import ContentBody from "./content-body";
import { Button } from "../button";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import ContentWrapper from "./content-wrapper";
import { useToken } from "@/hooks/useToken";
import { useDeleteAccount } from "@/hooks/useDeleteAccount";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const DeleteAccount = () => {
  const router = useRouter();
  const { token } = useToken();
  const { mutate } = useDeleteAccount();

  const deleteHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete all data permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#FFF",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: `<span class="text-black">Cancel</span>`,
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(token, {
          onSuccess: async (data) => {
            if (!data?.isError) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              });

              setTimeout(() => {
                Cookies.remove("tk");
                router.push("/register");
              }, 2000);
            } else {
              Swal.fire({ icon: "error", title: data.data.message });
            }
          },
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
