export interface ProductType {
  id: string;
  name: string;
  size: number;
  stock: number;
  price: number;
  status: string;
  thumbnail: string;
}

export interface PaymentType {
  id: number;
  type: string;
  payment_name: string;
  account_number: number;
  recipient_name: string;
  status: string;
  thumbnail: string;
}

export interface OrderType {
  id: number;
  qty: number;
  total_price: number;
  status: string;
  receipt_number: string | null;
  product: ProductType;
  createdAt: string;
}

export interface AddressType {
  id: string;
  city: string;
  province: string;
  full_address: string;
  recipient_name: string;
  phone: string;
}

export interface UserType {
  id: string;
  username: string;
  email: string;
  role: string;
  avatar?: string;
  addresses: AddressType[];
}

export type UserProfile = Omit<UserType, "addresses">;

export interface FetchResponse {
  isError: boolean;
  data: any;
}

export interface RegisterField {
  username: string;
  email: string;
  password: string;
}

export interface UserPayload {
  fat: number;
  customer: Omit<UserType, "addresses">;
}

export interface MidtransPayload {
  order_id: string;
  gross_amount: number;
  item_details: string;
  address_id: string;
}

export interface CreateOrderPayload {
  order_id: string;
  item_details: string;
  transaction_details: string;
}
