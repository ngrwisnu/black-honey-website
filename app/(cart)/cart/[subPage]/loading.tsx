import { Skeleton } from "@/components/ui/skeleton";

const CartLoading = () => {
  return (
    <>
      <div className="flex w-full flex-1 items-start justify-center self-stretch">
        <div className="flex w-full flex-col items-start gap-8 rounded-lg bg-white p-4 shadow-section sm:max-w-[830px]">
          <Skeleton className="mb-10 h-6 w-1/2 rounded-full" />
          <Skeleton className="h-6 w-1/2 rounded-full" />
        </div>
      </div>
    </>
  );
};

export default CartLoading;
