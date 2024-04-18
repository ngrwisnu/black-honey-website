"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../button";
import { X } from "lucide-react";
import { Input } from "../input";
import Image from "next/image";
import useModal from "@/store/modal-slice";
import { FetchResponse, ProductType } from "@/types/types";
import { currencyFormatter } from "@/lib/utils";
import useCart from "@/store/cart";
import { toast } from "../use-toast";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

interface ModalProps {
  products: FetchResponse | undefined;
}

const Modal = dynamic(() => import("../modal"), { ssr: false });

const ProductsModal = ({ products }: ModalProps) => {
  const [productList, setProductList] = useState<ProductType[] | undefined>();
  const [activeProduct, setActiveProduct] = useState<ProductType>();
  const [qty, setQty] = useState(1);
  const [isError, setIsError] = useState(false);

  const router = useRouter();
  const modal = useModal();
  const cart = useCart();
  const userProfile = useUserProfile();

  useEffect(() => {
    if (products) {
      if (!products.isError) {
        setProductList(products.data.data);
        setActiveProduct(products.data.data[0]);
      } else {
        setIsError(true);
      }
    } else {
      setProductList(undefined);
    }
  }, [products]);

  const sizeHandler = (size: number) => {
    const selectedProduct = productList?.find((item) => item.size === size);

    if (selectedProduct) {
      setActiveProduct(selectedProduct);
    }
  };

  const addToCartHandler = () => {
    if (qty > activeProduct?.stock!) {
      toast({
        title: "Purchase is over the stock",
        variant: "destructive",
      });

      return;
    }

    if (!userProfile?.id) {
      router.push("/login");
      return;
    }

    const data = {
      uid: userProfile?.id!,
      qty,
      product: activeProduct!,
    };

    cart.addItem(data);
    modal.onClose();
    setQty(1);
  };

  const closeHandler = () => {
    setQty(1);

    modal.onClose();
  };

  if (!modal.isOpen) {
    return;
  }

  return (
    <Modal overlayHandler={closeHandler}>
      {!productList || isError ? (
        <div className="w-full">
          <div
            className="flex items-center justify-end self-stretch"
            aria-label="Button to close the modal"
          >
            <Button variant="ghost" onClick={closeHandler}>
              <X size={20} />
            </Button>
          </div>
          <div className="mx-auto w-2/3 p-4 pb-8 text-center">
            <h3 className="mb-4 text-2xl font-bold">Oops!</h3>
            <p>
              We&apos;re spinning up the server and may take a few seconds. Try
              to refresh this page in a few moments.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1" aria-label="Product's preview">
            <div className="relative h-[180px] w-full sm:h-[240px] md:h-full">
              <Image
                src={`${process.env.NEXT_PUBLIC_HOST}/images/uploads/${activeProduct?.thumbnail}`}
                fill={true}
                alt="Product's preview"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div
            className="flex flex-1 flex-col items-start gap-8 p-4 text-body-primary sm:p-6"
            aria-label="Modal's content"
          >
            <div
              className="flex items-center justify-end self-stretch"
              aria-label="Button to close the modal"
            >
              <Button variant="ghost" onClick={closeHandler}>
                <X size={20} />
              </Button>
            </div>
            <div
              className="flex w-full flex-col items-start gap-4"
              aria-label="Product's detail"
            >
              <div className="w-full border-b border-b-gray-950 pb-4">
                <h4
                  className="mb-1 text-lg font-medium"
                  aria-label="Product's name"
                >
                  {activeProduct?.name}
                </h4>
                <p className="text-2xl font-bold" aria-label="Price">
                  {currencyFormatter(activeProduct?.price!)}
                </p>
              </div>
              <div className="w-full" aria-label="Stock of the product">
                <p
                  className={`text-sm ${
                    activeProduct!.stock < 1 ||
                    activeProduct?.status === "OutOfStock"
                      ? "text-red-500"
                      : "text-body-primary"
                  }`}
                >
                  Stock:{" "}
                  {activeProduct!.stock < 1 ||
                  activeProduct?.status === "OutOfStock"
                    ? "Out of Stock"
                    : activeProduct?.stock}
                </p>
              </div>
              <div
                className="flex w-full flex-col items-start gap-1"
                aria-label="Product's size"
              >
                <p>Size</p>
                <div className="flex flex-wrap items-start gap-4">
                  {productList?.map((item: ProductType) => (
                    <div
                      key={item.id}
                      className={`relative flex items-center justify-center rounded-md border-gray-950 px-3 py-[6px] ${
                        activeProduct?.size == item.size
                          ? "bg-gray-950"
                          : "bg-transparent"
                      } ${
                        activeProduct?.size == item.size
                          ? "text-white"
                          : "text-body-primary"
                      } ${
                        activeProduct?.size == item.size
                          ? "border-none"
                          : "border"
                      }`}
                    >
                      <Input
                        type="radio"
                        id={`${item.size}`}
                        name="size"
                        value={item.size}
                        className="absolute opacity-0"
                        onChange={(e) =>
                          sizeHandler(Number(e.currentTarget.value))
                        }
                      />
                      <label htmlFor={`${item.size}`} className="font-medium">
                        {item.size} mL
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="flex w-full flex-col items-start gap-1"
                aria-label="Purchase quantity"
              >
                <p>Quantity</p>
                <Input
                  type="number"
                  name="quantity"
                  defaultValue={1}
                  max={activeProduct?.stock}
                  className="w-full rounded-md border-gray-950 md:w-1/3"
                  onChange={(e) => setQty(Number(e.currentTarget.value))}
                  disabled={
                    activeProduct!.stock < 1 ||
                    activeProduct?.status === "OutOfStock"
                  }
                />
              </div>
            </div>
            <Button
              className="self-stretch rounded-md"
              aria-label="Button add to cart"
              onClick={addToCartHandler}
              disabled={
                activeProduct!.stock < 1 ||
                activeProduct?.status === "OutOfStock"
              }
            >
              Add to Cart
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default ProductsModal;
