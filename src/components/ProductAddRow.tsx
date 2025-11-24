import { useState, useEffect, useRef } from "preact/hooks";
import { fuzzyMatch } from "@/utils/fuzzyMatch";
import { type Product } from "@/types/product";
import { AutocompletePopup } from "@/components/AutoCompletePopup";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { PlusIcon } from "lucide-react";

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
      handleSelect(matches[highlight].name);
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

  function handleSelect(name: string) {
    setName(name);
    setShowPopup(false);
    qtyRef.current!.focus();
    qtyRef.current!.select();
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
    <InputGroup className="w-full">
      <div className="relative flex-1">
        <InputGroupInput
          ref={nameRef}
          value={name}
          placeholder="Tambah bahan…"
          onKeyDown={handleNameKeyDown}
          onInput={(e) => {
            setName(e.currentTarget.value);
            setShowPopup(e.currentTarget.value.trim() !== "");
          }}
        />
        <AutocompletePopup
          show={showPopup}
          results={matches}
          highlight={highlight}
          onHover={setHighlight}
          onSelect={handleSelect}
        />
      </div>

      <InputGroupAddon>
        <PlusIcon />
      </InputGroupAddon>

      <InputGroupAddon align="inline-end">
        <InputGroupInput
          ref={qtyRef}
          type="number"
          value={qty}
          min={1}
          className="w-25 text-center"
          onKeyDown={handleQtyKeyDown}
          onInput={(e) => setQty(Number(e.currentTarget.value))}
        />
      </InputGroupAddon>
    </InputGroup>
  );
}
