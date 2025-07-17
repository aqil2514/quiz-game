import { useControllerLogics } from "../hooks/useControllerLogics";
import ControllerFinish from "./ControllerFinish";
import ControllerAnswered from "./ControllerAnswered";
import ControllerPauseUser from "./ControllerPauseUser";
import ControllerConfigs from "./ControllerConfigs";

export default function ContinueController() {
  const { quizState, closeConfigHandler } = useControllerLogics();

  if (quizState.isFinished) return <ControllerFinish />;

  if (quizState.isAnswered) return <ControllerAnswered />;

  if (quizState.isPausedUser) return <ControllerPauseUser />

  if (quizState.isConfig) return <ControllerConfigs closeHandler={closeConfigHandler} />

  return null;
}
