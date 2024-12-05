import {
  getDiscountPrice,
  isCouponExpired,
  isCouponValid,
  totalAfterDiscount,
} from "../utils";

describe("Utils", () => {
  const today = new Date();
  const yesterday = new Date();
  const tomorrow = new Date();

  const oneDay = 24 * 60 * 60 * 1000;
  yesterday.setTime(today.getTime() - oneDay);
  tomorrow.setTime(today.getTime() + oneDay);

  const mockCoupon = {
    id: "cp-1",
    name: "test",
    code: "test123",
    discount_type: "percent",
    discount_amount: "50",
    expired: tomorrow,
    status: "Active",
    image: null,
  };

  describe("isCouponExpired", () => {
    it("should return true if coupon already expired", () => {
      const result = isCouponExpired(yesterday.toString());

      expect(result).toBeTruthy();
    });

    it("should return false if coupon hasn't expired yet", () => {
      const result = isCouponExpired(tomorrow.toString());

      expect(result).toBeFalsy();
    });
  });

  describe("isCouponValid", () => {
    it("should be falsy if not valid", () => {
      const invalidCoupon = {
        ...mockCoupon,
        status: "InActive",
      };

      const result = isCouponValid(invalidCoupon);

      expect(result).toBeFalsy();
      expect(result).toBeFalsy();
    });

    it("should be truthy if coupon is valid", () => {
      const result = isCouponValid(mockCoupon);

      expect(result).toBeTruthy();
    });
  });

  describe("totalAfterDiscount", () => {
    it("should return the total when there is no discount", () => {
      const result = totalAfterDiscount(undefined, 100);

      expect(result).toBe(100);
    });

    it("should return the total with 50% discount", () => {
      const result = totalAfterDiscount(mockCoupon, 100);

      expect(result).toBe(50);
    });

    it("should return the total with 20 fixed discount", () => {
      const fixedCoupon = {
        ...mockCoupon,
        discount_amount: 20,
        discount_type: "fixed",
      };

      const result = totalAfterDiscount(fixedCoupon, 100);

      expect(result).toBe(80);
    });
  });

  describe("getDiscountPrice", () => {
    it("should return 0 when there is no discount", () => {
      const result = getDiscountPrice(undefined, 100);

      expect(result).toBe(0);
      expect(result).not.toBe(100);
    });

    it("should return the discount price", () => {
      const percentCoupon = {
        ...mockCoupon,
        discount_amount: 20,
      };

      const result = getDiscountPrice(percentCoupon, 100);

      expect(result).toBe(20);
      expect(result).not.toBe(80);
    });

    it("should return the discount price with 20 fixed discount", () => {
      const fixedCoupon = {
        ...mockCoupon,
        discount_amount: 20,
        discount_type: "fixed",
      };

      const result = getDiscountPrice(fixedCoupon, 100);

      expect(result).toBe(20);
      expect(result).not.toBe(80);
    });
  });
});
