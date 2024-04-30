import Condition from "../constants/Condition.js";
import Lotto from "../domain/Lotto.js";
import Validator from "../domain/Validator.js";
import Random from "../utils/Random.js";

const { LOTTO, MONEY } = Condition;

const LottoGenerator = {
  createLotto(money) {
    return Array.from({ length: Math.floor(money / MONEY.UNIT) }).map(() => {
      const numbers = Random.pickNumbersInRangeByRule({
        start: LOTTO.NUMBER_RANGE_MIN,
        end: LOTTO.NUMBER_RANGE_MAX,
        count: LOTTO.NUMBER_LENGTH,
      });

      return new Lotto(Validator.validateLottoNumbers(numbers));
    });
  },
};

export default LottoGenerator;
