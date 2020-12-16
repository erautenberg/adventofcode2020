function sortAdaptersByJoltage(adapters) {
  return adapters.sort((a, b) => a - b);
}

function getAdaptersWithJoltDifference(sortedAdapters, joltDifference, chargingOutlet = 0) {
  let adapters = sortedAdapters.filter((a, index) =>
    sortedAdapters[index + 1] - a === joltDifference);
  if (sortedAdapters[0] - chargingOutlet === joltDifference) {
    adapters.unshift(sortedAdapters[0]);
  }
  return adapters;
}

function getProductOfJoltDifferences(adaptersWithDevice) {
  return getAdaptersWithJoltDifference(adaptersWithDevice, 1).length *
    getAdaptersWithJoltDifference(adaptersWithDevice, 3).length;
}

function getAdapterComboCounts(adapters, maxJoltageDiff) {
  let joltageCombos = { [adapters[0]]: 1 };
  let i = 0;
  let j = i - 1;
  while (i < adapters.length) {
    const currAdapter = adapters[i];
    const prevAdapter = adapters[j];
    if (!joltageCombos[currAdapter]) {
      joltageCombos[currAdapter] = 0;
    }
    if (currAdapter !== undefined && prevAdapter !== undefined
      && (currAdapter - prevAdapter <= maxJoltageDiff)) {
      joltageCombos[currAdapter] += joltageCombos[prevAdapter];
      j--;
    } else {
      j = ++i - 1;
    }
  }
  return joltageCombos[adapters[adapters.length - 1]];
}

const DAY10 = 10;
parseData(DAY10, (input) => {
  const adapters = input.map(a => parseInt(a));

  let sortedAdapters = sortAdaptersByJoltage(adapters);
  // device's built-in adapter is always 3 higher than the highest adapter
  const deviceJoltage = sortedAdapters[sortedAdapters.length - 1] + 3;
  const adaptersWithDevice = sortedAdapters.concat(deviceJoltage);
  const adaptersWithOutletAndDevice = [0].concat(adaptersWithDevice);

  const part1 = getProductOfJoltDifferences(adaptersWithDevice, deviceJoltage);
  const part2 = getAdapterComboCounts(adaptersWithOutletAndDevice, 3);
  showAnswers(DAY10, part1, part2);
});
