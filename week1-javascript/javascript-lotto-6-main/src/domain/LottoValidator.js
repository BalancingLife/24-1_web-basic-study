import Message from "../constants/Message.js";
import Condition from "../constants/Condition.js";

const { ERROR } = Message;
const { LOTTO } = Condition;

const LottoValidator = {
  validateNumbersLength(numbers) {
    if (numbers.length !== LOTTO.NUMBER_LENGTH) {
      throw new Error(ERROR.LOTTO_NUMBERS_LENGTH);
    }
  },

  validateNumbersDuplicate(numbers) {
    if (new Set(numbers).size !== numbers.length) {
      throw new Error(ERROR.LOTTO_NUMBERS_NO_DUPLICATE);
    }
  },

  validateNumbersType(numbers) {
    if (!numbers.every((number) => Number.isInteger(Number(number)))) {
      throw new Error(ERROR.LOTTO_NUMBERS_TYPE);
    }
  },

  validateNumbersRange(numbers) {
    if (
      !numbers.every(
        (number) =>
          number >= LOTTO.NUMBER_RANGE_MIN && number <= LOTTO.NUMBER_RANGE_MAX,
      )
    ) {
      throw new Error(ERROR.LOTTO_NUMBERS_RANGE);
    }
  },
};

export default LottoValidator;
