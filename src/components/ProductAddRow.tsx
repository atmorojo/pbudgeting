import { useState, useEffect, useRef } from "preact/hooks";
import { useDebounce } from "@/hooks/useDebounce";
import { fuzzyMatch } from "@/utils/fuzzyMatch";
import { type Product } from "@/types/product";
import { AutocompletePopup } from "@/components/AutoCompletePopup";

export function ProductAddRow({
  products,
  onAdd,
}: {
  products: Product[];
  onAdd: (product: Product, qty: number) => void;
}) {
  const [name, setName] = useState<string>("");
  const [qty, setQty] = useState<number>(1);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [highlight, setHighlight] = useState<number>(0);

  const matches = fuzzyMatch(name, products, (p) => p.name);

  const nameRef = useRef<HTMLInputElement>(null);
  const qtyRef = useRef<HTMLInputElement>(null);

  useEffect(() => setHighlight(0), [name]);

  function handleNameKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((prev) => (prev + 1) % matches.length);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((prev) => (prev - 1 + matches.length) % matches.length);
    }

    if (e.key === "Enter") {
      e.preventDefault();
      setName(matches[highlight].name);
      setShowPopup(false);
      qtyRef.current!.focus();
      qtyRef.current!.select();
    }

    if (e.key === "Escape") {
      setShowPopup(false);
    }
  }

  function handleQtyKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      selectProduct(nameRef.current.value);
      nameRef.current!.focus();
    }
  }

  function selectProduct(productName: String) {
    const product = products.find((p) => p.name === productName);
    if (!product) return;

    onAdd(product, qty);

    // Reset
    setName("");
    setQty(1);
    setShowPopup(false);
  }

  return (
    <div class="flex items-center gap-2 p-2 relative">
      {/* name */}
      <div class="relative flex-1">
        <input
          ref={nameRef}
          class="border rounded w-full px-2 py-1"
          value={name}
          onKeyDown={handleNameKeyDown}
          onInput={(e) => {
            setName(e.currentTarget.value);
            setShowPopup(e.currentTarget.value.trim() !== "");
          }}
          placeholder="Tambah bahan…"
        />

        <AutocompletePopup
          show={showPopup}
          results={matches}
          highlight={highlight}
          onSelect={selectProduct}
        />
      </div>

      {/* qty */}
      <input
        ref={qtyRef}
        class="border rounded w-16 px-2 py-1 text-center"
        type="number"
        value={qty}
        onKeyDown={handleQtyKeyDown}
        onInput={(e) => {
          const v = Number(e.currentTarget.value);
          setQty(v);
        }}
        min={1}
      />
    </div>
  );
}
