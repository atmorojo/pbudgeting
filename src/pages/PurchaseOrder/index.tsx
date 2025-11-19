import { useState } from "preact/hooks";
import { Sheet } from "@/components/Sheet";
import { Product } from "@/types/product";
import { ProductAddRow } from "@/components/ProductAddRow";
import { Cart, CartItem, makeCartItem } from "@/types/cart";
import products from "@/data/product_fake.json";

export function POPage() {
  const [cart, setCart] = useState<Cart>([]);

  function handleAdd(product: Product, qty: number) {
    setCart((c: Cart) => [...c, makeCartItem(product, qty)]);
  }

  return (
    <div class="p-4">
      <h1 class="text-xl font-semibold mb-4">Purchase Orders</h1>

      <Sheet<CartItem>
        items={cart}
        getId={(po) => po.product.id}
        renderRow={(item) => (
          <>
            <div class="flex-1">{item.product.name}</div>
            <div class="w-24 text-right">
              {item.product.price.toLocaleString()}
            </div>
            <div class="w-12 text-center">{item.qty}</div>
            <div class="w-24 text-right">{item.subtotal.toLocaleString()}</div>
          </>
        )}
      />
      <ProductAddRow products={products} onAdd={handleAdd} />

      {/* Extension point: actions/buttons will go here later */}
    </div>
  );
}
