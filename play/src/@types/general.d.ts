import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

export interface ValueLabel {
  value: string;
  label: string;
}

export interface ValueLabelWithIcon extends ValueLabel {
  icon: IconType | LucideIcon;
}
