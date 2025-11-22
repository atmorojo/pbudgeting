import { useState } from "preact/hooks";
import { ProductAddRow } from "@/components/ProductAddRow";
import { type ComponentChildren } from "preact";
import { Table, TableRow } from "@/components/ui/table";
import { cn } from "@/utils";

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
    <TableRow
      className={cn(selected && "bg-blue-100")}
      onClick={() => onSelect(item)}
    >
      {children
        ? children
        : Object.entries(item).map(([key, val]) => (
            <TableCell key={key}>
              {formatValue(val)}
            </TableCell>
          ))}
    </TableRow>
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
    <Table>
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
    </Table>
  );
}
