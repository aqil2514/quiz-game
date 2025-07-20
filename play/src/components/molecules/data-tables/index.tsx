"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableDefault } from "./default";

type TableVariant = "default";

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

interface DataTableProps<TData, TValue> {
  props: Props<TData, TValue>;
  variants: TableVariant;
}

export function DataTable<TData, TValue>({
  props,
  variants = "default",
}: DataTableProps<TData, TValue>) {
  if (variants === "default") return <DataTableDefault props={props} />;

  return null;
}
