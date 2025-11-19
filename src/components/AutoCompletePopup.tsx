import { type Product } from "@/types/product";

export function AutocompletePopup({ show, results, highlight, onSelect }) {
  if (!show || results.length === 0) return null;

  return (
    <div class="absolute z-10 bg-white border shadow w-full mt-1 max-h-64 overflow-y-auto">
      {results.map((p: Product, idx: number) => (
        <div
          key={p.id}
          class={
            "p-2 cursor-pointer " + (idx === highlight ? "bg-blue-100" : "")
          }
          onMouseDown={() => onSelect(p)}
        >
          {p.name}
        </div>
      ))}
    </div>
  );
}
