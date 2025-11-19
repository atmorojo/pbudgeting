import { useState } from "preact/hooks";
import { ProductAddRow } from "@/components/ProductAddRow";
import { type ComponentChildren } from "preact";

type RowProps<T> = {
  item: T;
  selected: boolean;
  onSelect: (item: T) => void;
  children?: ComponentChildren;
};

function Row<T extends object>({
  item,
  selected,
  onSelect,
  children,
}: RowProps<T>) {
  const formatValue = (val: unknown): string => {
    if (typeof val === "number") return val.toLocaleString("id-ID");
    return String(val);
  };

  return (
    <div
      class={`flex items-center px-4 py-2 cursor-pointer border-b last:border-b-0
        ${selected ? "bg-blue-100" : "hover:bg-gray-50"}`}
      onClick={() => onSelect(item)}
    >
      {children
        ? children
        : Object.entries(item).map(([key, val]) => (
            <div class="flex-1 text-sm text-gray-800" key={key}>
              {formatValue(val)}
            </div>
          ))}
    </div>
  );
}

type SheetProps<T> = {
  items: T[];
  getId: (item: T) => string | number;
  renderRow?: (item: T) => preact.VNode;
};

export function Sheet<T extends object>({
  items,
  getId,
  renderRow,
}: SheetProps<T>) {
  const [selectedId, setSelectedId] = useState<string | number | null>(null);

  return (
    <div class="border rounded-md overflow-hidden">
      {items.map((item) => {
        const id = getId(item);
        return (
          <Row<T>
            key={id}
            item={item}
            selected={selectedId === id}
            onSelect={() => setSelectedId(id)}
          >
            {renderRow ? renderRow(item) : null}
          </Row>
        );
      })}
    </div>
  );
}
