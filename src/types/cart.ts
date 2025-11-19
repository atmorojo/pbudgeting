import type { Product } from "./product";

export type CartItem = {
  product: Product;
  qty: number;
  readonly subtotal: number;
};

export type Cart = CartItem[];

export function makeCartItem(product: Product, qty: number): CartItem {
  return {
    product,
    qty,
    get subtotal() {
      return this.qty * this.product.price;
    },
  };
}
