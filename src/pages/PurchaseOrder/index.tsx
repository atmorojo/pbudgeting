import { useState } from "preact/hooks";
import { type Product } from "@/types/product";
import { type Cart, type CartItem, makeCartItem } from "@/types/cart";
import { Sheet } from "@/components/Sheet";
import { ProductAddRow } from "@/components/ProductAddRow";
import { GrandTotal } from "@/components/GrandTotal";
import { TableCell } from "@/components/ui/table";
import products from "@/data/product_fake.json";

export function POPage() {
  const [cart, setCart] = useState<Cart>([]);

  function handleAdd(product: Product, qty: number) {
    setCart((c: Cart) => [...c, makeCartItem(product, qty)]);
  }

  return (
    <div class="mx-auto w-full max-w-3xl flex flex-col h-full p-4">
      <h1 class="text-xl font-semibold mb-4">Purchase Orders</h1>

      <Sheet<CartItem>
        items={cart}
        colNames={[
          ["Product", ""],
          ["Qty", "text-center"],
          ["Price", "text-end"],
          ["Subtotal", "text-end"],
        ]}
        getId={(po) => po.product.id}
        renderRow={(item) => (
          <>
            <TableCell>{item.product.name}</TableCell>
            <TableCell className="text-center">{item.qty}</TableCell>
            <TableCell className="text-end">
              {item.product.price.toLocaleString()}
            </TableCell>
            <TableCell className="text-end">
              {item.subtotal.toLocaleString()}
            </TableCell>
          </>
        )}
      />
      <ProductAddRow products={products} onAdd={handleAdd} />

      <GrandTotal cart={cart} />
    </div>
  );
}
