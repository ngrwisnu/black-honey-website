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
import Modal from "../modal";

interface ModalProps {
  products: FetchResponse | undefined;
}

const ProductsModal = ({ products }: ModalProps) => {
  const [productList, setProductList] = useState<ProductType[]>();
  const [activeProduct, setActiveProduct] = useState<ProductType>();
  const [qty, setQty] = useState(1);
  const [isError, setIsError] = useState(false);

  const modal = useModal();
  const cart = useCart();

  useEffect(() => {
    if (products) {
      if (!products.isError) {
        setProductList(products.data.data);
        setActiveProduct(products.data.data[0]);
      } else {
        setIsError(true);
      }
    }
  }, [products]);

  const sizeHandler = (size: number) => {
    const selectedProduct = productList?.find((item) => item.size === size);

    if (selectedProduct) {
      setActiveProduct(selectedProduct);
    }
  };

  const addToCartHandler = () => {
    const data = {
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
    <Modal>
      {isError && (
        <div>
          <h2>Something went wrong!</h2>
        </div>
      )}
      {!isError && (
        <>
          <div className="flex-1" aria-label="Product's preview">
            <div className="relative h-[240px] w-full md:h-full">
              <Image
                src={`${process.env.NEXT_PUBLIC_DEV_ROOT}/images/uploads/${activeProduct?.thumbnail}`}
                fill={true}
                alt="Product's preview"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div
            className="flex flex-1 flex-col items-start gap-8 p-6 text-body-primary"
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
                <p className="text-sm">Stock: {activeProduct?.stock}</p>
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
                      className={`relative flex items-center justify-center rounded-full border-gray-950 px-3 py-[6px] ${
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
                  className="w-full rounded-full border-gray-950 md:w-1/3"
                  onChange={(e) => setQty(Number(e.currentTarget.value))}
                />
              </div>
            </div>
            <Button
              className="self-stretch rounded-full"
              aria-label="Button add to cart"
              onClick={addToCartHandler}
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
