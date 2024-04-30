import Condition from "../constants/Condition.js";
import Message from "../constants/Message.js";

const { RESTART_OPTION } = Condition;
const { ERROR } = Message;

const RestartOptionValidator = {
  validateCharacter(restartOption) {
    if (
      restartOption.toLowerCase() !== RESTART_OPTION.RESTART &&
      restartOption.toLowerCase() !== RESTART_OPTION.EXIT
    ) {
      throw new Error(ERROR.OPTION_CHARACTER);
    }
  },
};

export default RestartOptionValidator;
