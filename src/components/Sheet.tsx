import { useState } from "preact/hooks";
import { type ComponentChildren } from "preact";
import { toTitleCase } from "@/utils";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

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
  return (
    <TableRow
      className={selected && "bg-blue-100"}
      onClick={() => onSelect(item)}
    >
      {children
        ? children
        : Object.entries(item).map(([key, val]) => (
            <TableCell key={key}>{val}</TableCell>
          ))}
    </TableRow>
  );
}

type SheetProps<T> = {
  items: T[];
  colNames: [string, string][];
  getId: (item: T) => string | number;
  renderRow?: (item: T) => preact.VNode;
};

export function Sheet<T extends object>({
  items,
  getId,
  colNames,
  renderRow,
}: SheetProps<T>) {
  const [selectedId, setSelectedId] = useState<string | number | null>(null);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {colNames.map((col) => (
            <TableHead
              className={"font-bold " + (col[1] ? col[1] : " text-start")}
            >
              {toTitleCase(col[0])}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
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
      </TableBody>
    </Table>
  );
}
