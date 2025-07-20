import * as React from "react";
import { SelectFilter, SelectFilterContext } from "../select";

export interface AdminPageHeaderContext {
  fiterSelectContext: SelectFilterContext;
  righSide?: React.ReactNode;
  onChange?: (name: string, value: string) => void;
}

interface AdminPageHeaderProps {
  context: AdminPageHeaderContext;
}

export default function AdminPageHeader({ context }: AdminPageHeaderProps) {
  const { fiterSelectContext, righSide } = context;

  return (
    <div className="flex justify-between">
      <div>
        <SelectFilter context={fiterSelectContext} />
      </div>
      {righSide}
    </div>
  );
}
