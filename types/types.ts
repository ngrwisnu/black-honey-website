export interface ProductType {
  id: number;
  name: string;
  price: number;
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
