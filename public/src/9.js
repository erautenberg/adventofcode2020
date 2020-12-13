function hasAddends(list, sum, count) {
  if (count === 0) { return true; }
  else if (count === 1) { return list.includes(sum); }
  else {
    return list.some((n, index) => {
      let shortenedList = list.slice(0, index).concat(list.slice(index+1));
      return hasAddends(shortenedList, sum - n, count - 1);
    });
  }
}

function findIndexOfMissingSum(list, preambleCount, addendCount) {
  for (let i=preambleCount; i<list.length - 1; i++) {
    if (!hasAddends(list.slice(i - preambleCount, i), list[i], addendCount)) {
      return i;
    }
  }
  return;
}

function getEncryptionWeakness(missingSumIndex, list) {
  let contiguousList = findContiguousSum(list[missingSumIndex], list);
  const min = Math.min(...contiguousList);
  const max = Math.max(...contiguousList);
  return min + max;
}

function findContiguousSum(sum, list) {
  let contiguous = [];
  let remainingSum = sum;
  for(let i=0; i<list.length; i++) {
    for(let j=i; j<list.length; j++) {
      if (remainingSum === 0) {
        return contiguous;
      }
      else if (list[j] > remainingSum) {
        contiguous = [];
        remainingSum = sum;
        break;
      }
      else {
        contiguous.push(list[j]);
        remainingSum -= list[j];
      }
    }
  }
  return contiguous;
}

const DAY9 = 9;
parseData(DAY9, (input) => {
  const xMAS = input.map(n => parseInt(n));
  const preambleCount = 25;
  const missingSumIndex = findIndexOfMissingSum(xMAS, preambleCount, 2);
  const part1 = xMAS[missingSumIndex];
  const part2 = getEncryptionWeakness(missingSumIndex, xMAS);
  showAnswers(DAY9, part1, part2);
});
