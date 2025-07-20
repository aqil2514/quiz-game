"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableDefault } from "./default";

type TableVariant = "default";

export interface DataTableContext<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

interface DataTableProps<TData, TValue> {
  context: DataTableContext<TData, TValue>;
  variants: TableVariant;
}

export function DataTable<TData, TValue>({
  context,
  variants = "default",
}: DataTableProps<TData, TValue>) {
  console.log(context)
  if (variants === "default") return <DataTableDefault props={context} />;

  return null;
}
