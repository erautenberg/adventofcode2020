function findBusAndDeparture(timestamp, ids) {
  let busId = ids.find(id => timestamp % id === 0);
  if (busId) {
    return { timestamp, busId };
  } else {
    return findBusAndDeparture(++timestamp, ids);
  }
}

function findEarliestTimeStamp(busIds) {
  let timestamp = 0;
  let step = busIds[0];
  for (let i=1; i<busIds.length; i++) {
    while ((timestamp + i) % busIds[i] !== 0) {
      timestamp += step;
    }
    step *= busIds[i];
  }
  return timestamp;
}

const DAY13 = 13;
parseData(DAY13, (input) => {
  const timestamp = parseInt(input.shift());
  const busIds = input[0].split(',').map(id => parseInt(id)).filter(id => !isNaN(id));
  const allBusIds = input[0].split(',').map(id => id === 'x' ? 1 : parseInt(id));
  const busTime = findBusAndDeparture(timestamp, busIds);
  const part1 = (busTime.timestamp - timestamp) * busTime.busId;
  const part2 = findEarliestTimeStamp(allBusIds);
  showAnswers(DAY13, part1, part2);
});
