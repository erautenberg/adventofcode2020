function isATree(char) {
  return char === '#';
}

function getTreeCount(map, slopeRight, slopeDown) {
  let treeCount = 0;
  for (let row=0, column=0; map[row]; row+=slopeDown, column+=slopeRight) {
    let position = map[row][column];
    if (!position) {
      column -= map[row].length;
      position = map[row][column];
    }
    isATree(map[row][column]) && treeCount++;
  }
  return treeCount;
}

function checkSlopes(map) {
  const slopes = [
    [ 1, 1 ],
    [ 3, 1 ],
    [ 5, 1 ],
    [ 7, 1 ],
    [ 1, 2 ]
  ];
  return slopes.map(s => getTreeCount(map, s[0], s[1]));
}

function multiplyTreeCounts(treeCounts) {
  return treeCounts.reduce((acc, cur) => acc * cur, 1);
}

const DAY3 = 3;
parseData(DAY3, (input) => {
  const slopeRight = 3;
  const slopeDown = 1;
  const part1 = getTreeCount(input, slopeRight, slopeDown);
  const part2 = multiplyTreeCounts(checkSlopes(input));
  showAnswers(DAY3, part1, part2);
});
