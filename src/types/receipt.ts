import { type Cart } from "@/types/cart";

export type Receipt = {
  id: string;
  customer?: string;
  cart: Cart;
  readonly total: number;
};
