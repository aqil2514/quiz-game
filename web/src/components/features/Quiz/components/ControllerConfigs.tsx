import ControllerContainer from "@/components/layouts/Container/ControllerContainer";
import Config from "../../Option/components/Config";

export default function ControllerConfigs() {
  return (
    <ControllerContainer>
      <Config isInGame />
    </ControllerContainer>
  );
}
