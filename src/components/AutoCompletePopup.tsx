import { type Product } from "@/types/product";

export function AutocompletePopup({
  show,
  results,
  highlight,
  onHover,
  onSelect,
}) {
  if (!show || results.length === 0) return null;

  return (
    <div class="absolute z-10 bg-white border shadow w-full mt-1 max-h-64 overflow-y-auto">
      {results.map((p: Product, idx: number) => (
        <div
          key={p.id}
          className={
            "p-2 cursor-pointer " + (idx === highlight ? "bg-sky-400" : "")
          }
          onClick={() => onSelect(p.name)}
          onMouseEnter={() => onHover(idx)}
        >
          {p.name}
        </div>
      ))}
    </div>
  );
}
