const OCCUPIEDSEAT = '#';
const EMPTYSEAT = 'L';
const FLOOR = '.';

function formatSeatString(seats) {
  return seats.map(row => row.join('')).join('\n');
}

function countOccupiedSeats(seats) {
  let count = 0;
  seats.forEach(row => { row.forEach(column => column === OCCUPIEDSEAT && count++) });
  return count;
}

function findFinalSeatingArrangements(seats, maxOccupied, occupationRule) {
  let oldSeats, newSeats;
  do {
    oldSeats = JSON.parse(JSON.stringify(newSeats || seats));
    newSeats = changeSeats(newSeats || seats, maxOccupied, occupationRule);
  } while (JSON.stringify(oldSeats) !== JSON.stringify(newSeats));
  return newSeats;
}

function changeSeats(seats, maxOccupied, occupationRule) {
  let newSeats = JSON.parse(JSON.stringify(seats));
  for (let i=0; i<seats.length; i++) {
    for (let j=0; j<seats[i].length; j++) {
      if (canBecomeOccupied(seats, i, j, occupationRule)) {
        newSeats[i][j] = '#';
      }
      if (canBecomeEmpty(seats, maxOccupied, i, j, occupationRule)) {
        newSeats[i][j] = 'L';
      }
    }
  }
  return newSeats;
}

function canBecomeEmpty(seats, maxOccupied, row, column, occupationRule) {
  if (seats[row][column] !== OCCUPIEDSEAT) {
    return false;
  }
  let count = 0;
  for (let i=row-1; i<=row+1; i++) {
    for (let j=column-1; j<=column+1; j++) {
      if (i === row && j === column) {
        continue;
      }
      if (occupationRule(seats, i, j, row, column)) {
        if (++count >= maxOccupied) {
          return true;
        }
      }
    }
  }
  return count >= maxOccupied;
}

function canBecomeOccupied(seats, row, column, occupationRule) {
  if (seats[row][column] !== EMPTYSEAT) {
    return false;
  }
  for (let i=row-1; i<=row+1; i++) {
    for (let j=column-1; j<=column+1; j++) {
      if (i === row && j === column) {
        continue;
      }
      if (occupationRule(seats, i, j, row, column)) {
        return false;
      }
    }
  }
  return true;
}

function checkLineOfSight(seats, row, column, currRow, currColumn) {
  let rowOffset = 0;
  let columnOffset = 0;
  if (currRow < row) {
    if (currColumn < column) { // diagonally up and left
      rowOffset = -1;
      columnOffset = -1;
    } else if (currColumn > column) { // diagonally up and right
      rowOffset = -1;
      columnOffset = 1;
    } else { // straight up
      rowOffset = -1;
    }
  } else if (currRow > row) {
    if (currColumn < column) { // diagonally down and left
      rowOffset = 1;
      columnOffset = -1;
    } else if (currColumn > column) { // diagonally down and right
      rowOffset = 1;
      columnOffset = 1;
    } else { // straight down
      rowOffset = 1;
    }
  } else {
    if (currColumn < column) { // straight left
      columnOffset = -1;
    } else if (currColumn > column) { // straight right
      columnOffset = 1;
    }
  }
  return OCCUPIEDSEAT === getSeatInLine(seats, row, column, rowOffset, columnOffset);
}

function getSeatInLine(seats, row, column, rowOffset, columnOffset) {
  let r = row + rowOffset;
  let c = column + columnOffset;
  while (seats[r] && seats[r][c] === FLOOR) {
    r += rowOffset;
    c += columnOffset;
  }
  return seats[r] && seats[r][c];
}

function occupationRulePart1(seats, currRow, currColumn) {
  return seats[currRow] && seats[currRow][currColumn] === OCCUPIEDSEAT;
}

function occupationRulePart2(seats, currRow, currColumn, row, column) {
  return checkLineOfSight(seats, row, column, currRow, currColumn);
}

const DAY11 = 11;
parseData(DAY11, (input) => {
  const seats = input.map(row => row.split(''));

  const part1 = countOccupiedSeats(findFinalSeatingArrangements(seats, 4, occupationRulePart1));
  const part2 = countOccupiedSeats(findFinalSeatingArrangements(seats, 5, occupationRulePart2));
  showAnswers(DAY11, part1, part2);
});
