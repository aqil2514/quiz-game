import { useControllerLogics } from "../hooks/useControllerLogics";
import ControllerFinish from "./ControllerFinish";
import ControllerAnswered from "./ControllerAnswered";
import ControllerPauseUser from "./ControllerPauseUser";

export default function ContinueController() {
  const { quizState } = useControllerLogics();

  if (quizState.isFinished) return <ControllerFinish />;

  if (quizState.isAnswered) return <ControllerAnswered />;

  if (quizState.isPausedUser) return <ControllerPauseUser />

  return null;
}
