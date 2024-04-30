import MoneyValidator from "./MoneyValidator.js";
import LottoValidator from "./LottoValidator.js";
import RestartOptionValidator from "./RestartOptionValidator.js";

const Validator = {
  validateMoney(money) {
    MoneyValidator.validateType(money);
    MoneyValidator.validateRange(money);
    MoneyValidator.validateUnit(money);
    return money;
  },

  validateLottoNumbers(numbers) {
    LottoValidator.validateNumbersLength(numbers);
    LottoValidator.validateNumbersDuplicate(numbers);
    LottoValidator.validateNumbersType(numbers);
    LottoValidator.validateNumbersRange(numbers);
    return numbers;
  },

  validateBonusNumber(winningNumbers, number) {
    LottoValidator.validateNumbersDuplicate([...winningNumbers, number]);
    LottoValidator.validateNumbersType([number]);
    LottoValidator.validateNumbersRange([number]);
    return number;
  },

  validateRestartOption(restartOption) {
    RestartOptionValidator.validateCharacter(restartOption);
    return restartOption;
  },
};

export default Validator;
