import { type Cart, CartItem } from "@/types/cart";

export function GrandTotal({ cart }: { cart: Cart }) {
  const total: number = cart.reduce(
    (total: number, item: CartItem) => total + item.subtotal,
    0,
  );

  return (
    <div class="mt-auto p-4 bg-white border-t shadow-sm flex justify-between items-center">
      <span class="text-lg font-semibold">Total</span>
      <span class="text-xl font-bold">Rp {total.toLocaleString()}</span>
    </div>
  );
}
