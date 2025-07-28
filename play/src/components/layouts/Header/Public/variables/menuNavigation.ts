import { GrScorecard } from "react-icons/gr";
import { ValueLabelWithIcon } from "@/@types/general";
import { Home } from "lucide-react";

export const menuNavigation: ValueLabelWithIcon[] = [
  {
    icon: Home,
    label: "Beranda",
    value: "/",
  },
  {
    icon: GrScorecard,
    label: "Skor",
    value: "/score",
  },
];
