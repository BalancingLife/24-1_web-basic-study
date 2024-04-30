const Random = {
  pickNumbersInRangeByRule(rule) {
    const { start, end, count } = rule;
    const numbers = new Set();
    //Set 는 클래스로, 중복을 허용하지 않는 자료구조

    while (numbers.size < count) {
      numbers.add(Math.floor(Math.random() * (end - start + 1)) + start);
    }
    return Array.from(numbers);
    //Set를 배열로 반환
  },
};

export default Random;
