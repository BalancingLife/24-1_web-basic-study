import Validator from "../domain/Validator.js";
import StatisticsGenerator from "./StatisticsGenerator.js";
import LottoGenerator from "./LottoGenerator.js";
import MessageGenerator from "./MessageGenerator.js";
import Input from "../view/Input.js";
import Output from "../view/Output.js";
import retryUntilValid from "../utils/retryUntilValid.js";
import Condition from "../constants/Condition.js";

const { RESTART_OPTION } = Condition;

const LottoGame = {
  async start() {
    const lottoTickets = await this.purchaseLottoTickets();
    Output.printLottoTicketsCount(lottoTickets);
    Output.printLottoTicketsDetail(lottoTickets);

    const winningLotto = await this.makeWinningLotto();
    this.showPrizeStatistics(lottoTickets, winningLotto);

    await this.restartOrExit();
  },

  async getMoney() {
    const money = Validator.validateMoney(await Input.readMoney());
    return money;
  },

  async purchaseLottoTickets() {
    const money = await retryUntilValid(() => this.getMoney());
    return LottoGenerator.createLotto(money);
  },

  async getWinningNumbers() {
    const winningNumbers = await Input.readWinningNumbers();

    return Validator.validateLottoNumbers(
      winningNumbers
        .split(",")
        .filter(
          (number) => number !== "" && number !== undefined && number !== null,
        )
        .map(Number),
    );
  },

  async getBonusNumber(winningNumbers) {
    const bonusNumber = await Input.readBonusNumber();
    return Validator.validateBonusNumber(winningNumbers, Number(bonusNumber));
  },

  async makeWinningLotto() {
    const winningNumbers = await retryUntilValid(() =>
      this.getWinningNumbers(),
    );
    const bonusNumber = await retryUntilValid(() =>
      this.getBonusNumber(winningNumbers),
    );

    return { winningNumbers, bonusNumber };
  },

  async getRestartOption() {
    const restartOption = await Input.readRestartOrExit();
    return Validator.validateRestartOption(restartOption);
  },

  async restartOrExit() {
    const restartOption = await retryUntilValid(() => this.getRestartOption());

    if (restartOption.toLowerCase() === RESTART_OPTION.RESTART) {
      await this.start();
    }
  },

  showPrizeStatistics(lottoTickets, winningLotto) {
    const prizes = StatisticsGenerator.calculateAllPrize(
      lottoTickets,
      winningLotto,
    );
    const returnOnInvestment =
      StatisticsGenerator.calculateReturnOnInvestment(prizes);

    Output.printPrizeStatisticsHeader();
    Output.printPrizeDetails(MessageGenerator.makePrizeDetailPhrases(prizes));
    Output.printReturnOnInvestment(returnOnInvestment);
  },
};

export default LottoGame;
