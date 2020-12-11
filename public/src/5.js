function binarySpacePartition(boardingPass, rows, columns) {
  let rowCount = rows;
  let columnCount = columns;
  let rowStart = 1;
  let rowEnd = rowCount;
  let columnStart = 1;
  let columnEnd = columnCount;

  [...boardingPass].forEach(direction => {
    switch(direction) {
      case 'F':
        rowCount = rowCount / 2;
        rowEnd -= rowCount;
        break;
      case 'B':
        rowCount = rowCount / 2;
        rowStart += rowCount;
        break;
      case 'L':
        columnCount = columnCount / 2;
        columnEnd -= columnCount;
        break;
      case 'R':
        columnCount = columnCount / 2;
        columnStart += columnCount;
        break;
    }
  });

  rowStart--;
  columnStart--;

  return (rowStart * columns) + columnStart;
}

function getAllSeatIds(boardingPasses, rows, columns) {
  return boardingPasses.map(b => binarySpacePartition(b, rows, columns));
}

function getHighestSeatId(boardingPasses, rows, columns) {
  return Math.max(...getAllSeatIds(boardingPasses, rows, columns));
}

function sortSeatIds(boardingPasses, rows, columns) {
  return getAllSeatIds(boardingPasses, rows, columns).sort((a, b) => a - b);
}

function findMissingId(boardingPasses, rows, columns) {
  const orderedIds = sortSeatIds(boardingPasses, rows, columns);
  const prevSeat = orderedIds.find((id, index) =>
    orderedIds[index + 1] && (id !== orderedIds[index + 1] - 1));
  return prevSeat + 1;
}

const DAY5 = 5;
parseData(DAY5, (input) => {
  const part1 = getHighestSeatId(input, 128, 8);
  const part2 = findMissingId(input, 128, 8);
  showAnswers(DAY5, part1, part2);
});
