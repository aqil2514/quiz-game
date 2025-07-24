import * as React from "react";
import { SelectFilter, SelectFilterContext } from "../select";

export interface AdminPageHeaderContext<TData> {
  filterSelectContext: SelectFilterContext<TData>;
  RightSide?: React.ComponentType;
  onChange?: (name: string, value: string) => void;
}

interface AdminPageHeaderProps<TData> {
  context: AdminPageHeaderContext<TData>;
}

export default function AdminPageHeader<TData>({
  context,
}: AdminPageHeaderProps<TData>) {
  const { filterSelectContext, RightSide } = context;

  return (
    <div className="flex justify-between">
      <div>
        <SelectFilter context={filterSelectContext} />
      </div>
      {RightSide && <RightSide />}
    </div>
  );
}
