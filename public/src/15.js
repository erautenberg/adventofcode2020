function getNumberSpokenByIndex(startingNumbers, spokenIndex) {
  if (startingNumbers.length >= spokenIndex) {
    return startingNumbers[spokenIndex - 1];
  }

  let spokenNumbers = new Map();
  startingNumbers.forEach((n, index) => spokenNumbers.set(n, index + 1));
  let lastSpoken = startingNumbers[startingNumbers.length - 1];

  for (let turn=startingNumbers.length + 1, next; turn<=spokenIndex; turn++) {
    next = spokenNumbers.has(lastSpoken) ? turn - 1 - spokenNumbers.get(lastSpoken) : 0;
    spokenNumbers.set(lastSpoken, turn - 1);
    lastSpoken = next;
  }
  return lastSpoken;
}

const DAY15 = 15;
parseData(DAY15, (input) => {
  const numbers = input[0].split(',').map(n => parseInt(n));
  const part1 = getNumberSpokenByIndex(numbers, 2020);
  const part2 = getNumberSpokenByIndex(numbers, 30000000);
  showAnswers(DAY15, part1, part2);
});
