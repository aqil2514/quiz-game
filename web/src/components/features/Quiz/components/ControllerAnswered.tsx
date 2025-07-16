import ControllerContainer from "@/components/layouts/Container/ControllerContainer";
import { useControllerLogics } from "../hooks/useControllerLogics";

export default function ContinueControllerAnswered() {
  const { nextQuestions, clickHandler } = useControllerLogics();
  return (
    <ControllerContainer onClick={clickHandler}>
      <p className="text-2xl text-white font-bold absolute bottom-36 animate-pulse">
        {nextQuestions
          ? "Klik di mana pun untuk melanjutkan..."
          : "Klik di manapun untuk melihat nilai..."}
      </p>
    </ControllerContainer>
  );
}
