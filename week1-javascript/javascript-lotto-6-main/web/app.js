const purchaseAmountInput = document.getElementById("purchase-amount");
const purchaseButton = document.getElementById("purchase-button");
const winningNumbersInput = document.getElementById("winning-numbers");
const winningButton = document.getElementById("winning-button");
const bonusNumberInput = document.getElementById("bonus-number");
const lottoContainer = document.getElementById("lotto-container");
const resultContainer = document.getElementById("result-container");
const winningLottoContainer = document.getElementById(
  "winning-lotto-container",
);

let numberOfLottos;

purchaseButton.addEventListener("click", function (event) {
  event.preventDefault();

  winningLottoContainer.style.display = "block";

  purchaseButton.disabled = true;
});

winningLottoContainer.style.display = "none";

purchaseButton.addEventListener("click", handlePurchase);
winningButton.addEventListener("click", handleWinningCheck);

function handlePurchase() {
  const purchaseAmount = parseInt(purchaseAmountInput.value);
  if (!Number.isInteger(purchaseAmount) || purchaseAmount % 1000 !== 0) {
    printError("[ERROR] 구입 금액은 1,000원 단위로 입력해야 합니다.");
    return;
  }
  const lottos = generateLottos(purchaseAmount);
  printLottos(lottos);
}

function generateLottos(amount) {
  numberOfLottos = amount / 1000;
  const lottos = [];
  for (let i = 0; i < numberOfLottos; i++) {
    const numbers = pickUniqueNumbersInRange(1, 45, 6);
    lottos.push(numbers);
  }
  return lottos;
}

function pickUniqueNumbersInRange(min, max, count) {
  const numbers = new Set();
  while (numbers.size < count) {
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.add(number);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

function printLottos(lottos) {
  lottoContainer.innerHTML = `총 ${numberOfLottos}개를 구매하였습니다.`;
  lottos.forEach((numbers) => {
    const lottoTicket = document.createElement("div");
    lottoTicket.classList.add("lotto-ticket");

    const lottoIcons = document.createElement("div");
    lottoIcons.classList.add("icon");
    lottoIcons.textContent = `🎟️`;

    const lottoNumbers = document.createElement("div");
    lottoNumbers.id = "lotto-numbers";
    lottoNumbers.classList.add("body-text");
    lottoNumbers.textContent = `${numbers.join(",")}`;

    lottoTicket.appendChild(lottoIcons);
    lottoTicket.appendChild(lottoNumbers);

    lottoContainer.appendChild(lottoTicket);
  });
}

function handleWinningCheck() {
  const winningNumbers = winningNumbersInput.value
    .split(",")
    .map((num) => parseInt(num));
  if (winningNumbers.some(isNaN) || winningNumbers.length !== 6) {
    printError("[ERROR] 당첨 번호는 1~45 사이의 6개의 숫자로 입력해야 합니다.");
    return;
  }
  const bonusNumber = parseInt(bonusNumberInput.value);
  if (isNaN(bonusNumber) || bonusNumber < 1 || bonusNumber > 45) {
    printError("[ERROR] 보너스 번호는 1~45 사이의 숫자로 입력해야 합니다.");
    return;
  }
  printWinningStatistics(winningNumbers, bonusNumber);
}

function printWinningStatistics(winningNumbers, bonusNumber) {
  let matchingCounts = [0, 0, 0, 0, 0];
  let bonusMatchCount = 0;
  let totalPrize = 0;

  const lottos = lottoContainer.children;
  for (let i = 0; i < lottos.length; i++) {
    const numbersText = lottos[i].querySelector(".body-text").textContent;
    const numbers = numbersText.split(",").map((num) => parseInt(num.trim()));

    const matchCount = getMatchCount(winningNumbers, numbers);
    if (matchCount === 6) {
      matchingCounts[4]++;
    } else if (matchCount === 5 && numbers.includes(bonusNumber)) {
      bonusMatchCount++;
    } else if (matchCount === 5) {
      matchingCounts[3]++;
    } else if (matchCount === 4) {
      matchingCounts[2]++;
    } else if (matchCount === 3) {
      matchingCounts[1]++;
    }
  }

  const prizeList = [0, 5000, 50000, 1500000, 30000000, 2000000000];
  totalPrize += matchingCounts[1] * prizeList[1];
  totalPrize += matchingCounts[2] * prizeList[2];
  totalPrize += bonusMatchCount * prizeList[2];
  totalPrize += matchingCounts[3] * prizeList[3];
  totalPrize += matchingCounts[4] * prizeList[4];

  const totalSpent = lottos.length * 1000;

  const profitRate = ((totalPrize - totalSpent) / totalSpent + 1) * 100;
  const formattedProfitRate = Math.max(profitRate, 0).toFixed(1);

  resultContainer.innerHTML = `<br>당첨 통계<br>---------------------`;
  resultContainer.innerHTML += `<br>3개 일치 (${prizeList[1]}원) - ${matchingCounts[1]}개`;
  resultContainer.innerHTML += `<br>4개 일치 (${prizeList[2]}원) - ${matchingCounts[2]}개`;
  resultContainer.innerHTML += `<br>5개 일치 (${prizeList[3]}원) - ${matchingCounts[3]}개`;
  resultContainer.innerHTML += `<br>5개 일치, 보너스 볼 일치 (${prizeList[3]}원) - ${bonusMatchCount}개`;
  resultContainer.innerHTML += `<br>6개 일치 (${prizeList[4]}원) - ${matchingCounts[4]}개`;
  resultContainer.innerHTML += `<br>총 수익률은 ${formattedProfitRate}%입니다.`;
}

function getMatchCount(winningNumbers, numbers) {
  let count = 0;
  for (let i = 0; i < winningNumbers.length; i++) {
    if (numbers.includes(winningNumbers[i])) {
      count++;
    }
  }
  return count;
}

function printError(message) {
  const errorDiv = document.createElement("div");
  errorDiv.textContent = message;
  resultContainer.innerHTML = "";
  resultContainer.appendChild(errorDiv);
}
