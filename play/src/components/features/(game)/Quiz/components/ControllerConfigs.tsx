import ControllerContainer from "@/components/layouts/Container/ControllerContainer";
import Config from "../../Option/components/Config";

interface ControllerConfigsProps{
  closeHandler: () => void;
}

export default function ControllerConfigs({ closeHandler }:ControllerConfigsProps) {
  return (
    <ControllerContainer>
      <Config isInGame closeHandler={closeHandler} />
    </ControllerContainer>
  );
}
