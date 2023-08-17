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
  avatar: string;
  addresses: AddressType[];
}
