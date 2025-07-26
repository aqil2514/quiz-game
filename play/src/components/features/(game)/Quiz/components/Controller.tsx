import { useControllerLogics } from "../hooks/useControllerLogics";
import ControllerFinish from "./ControllerFinish";
import ControllerAnswered from "./ControllerAnswered";
import ControllerPauseUser from "./ControllerPauseUser";
import ControllerConfigs from "./ControllerConfigs";

export default function ContinueController() {
  const { quizState, closeConfigHandler } = useControllerLogics();

  switch (true) {
    case quizState.isFinished:
      return <ControllerFinish />;
    case quizState.isAnswered:
      return <ControllerAnswered />;
    case quizState.isPausedUser:
      return <ControllerPauseUser />;
    case quizState.isConfig:
      return <ControllerConfigs closeHandler={closeConfigHandler} />;
    default:
      return null;
  }
}
