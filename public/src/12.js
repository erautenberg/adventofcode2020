const CARDINAL_DIRECTIONS = [ 'N', 'E', 'S', 'W' ];

function getManhattanDistance(east, north) {
  return Math.abs(east) + Math.abs(north);
}

function getNewDirection(current, rotation) {
  return CARDINAL_DIRECTIONS[
    (CARDINAL_DIRECTIONS.indexOf(current) + (rotation / 90))
    % CARDINAL_DIRECTIONS.length
  ];
}

function navigate(instructions, startingDirection) {
  let direction = startingDirection;
  let east = 0;
  let north = 0;
  instructions.forEach(i => {
    let heading = updatePosition(direction, east, north, i[0], i[1]);
    east = heading.east;
    north = heading.north;
    direction = heading.direction;
  });
  return { east, north };
}

function updatePosition(currentDirection, e, n, instruction, value) {
  let direction = currentDirection;
  let east = e;
  let north = n;

  switch (instruction) {
    case 'N':
      north += value;
      break;
    case 'S':
      north -= value;
      break;
    case 'E':
      east += value;
      break;
    case 'W':
      east -= value;
      break;
    case 'L':
      direction = getNewDirection(direction, 360 - value);
      break;
    case 'R':
      direction = getNewDirection(direction, value);
      break;
    case 'F':
      newHeading = updatePosition(direction, east, north, currentDirection, value);
      east = newHeading.east;
      north = newHeading.north;
      break;
  }
  return { east, north, direction };
}

function navigateWaypoint(instructions, startingDirection) {
  let direction = startingDirection;
  let waypointEast = 10;
  let waypointNorth = 1;
  let shipEast = 0;
  let shipNorth = 0;
  instructions.forEach(i => {
    let heading =
      updateWaypoint(direction, waypointEast, waypointNorth, i[0], i[1], shipEast, shipNorth);
    waypointEast = heading.east;
    waypointNorth = heading.north;
    direction = heading.direction;
    shipEast = heading.shipEast;
    shipNorth = heading.shipNorth;
  });
  return { east: shipEast, north: shipNorth };
}

function updateWaypoint(currentDirection, e, n, instruction, value, shipE, shipN) {
  let direction = currentDirection;
  let east = e;
  let north = n;
  let shipEast = shipE;
  let shipNorth = shipN;
  let rotationChange;

  switch (instruction) {
    case 'N':
      north += value;
      break;
    case 'S':
      north -= value;
      break;
    case 'E':
      east += value;
      break;
    case 'W':
      east -= value;
      break;
    case 'L':
      direction = getNewDirection(direction, 360 - value);
      rotationChange = rotateWaypoint(east, north, 360 - value);
      east = rotationChange.east;
      north = rotationChange.north;
      break;
    case 'R':
      direction = getNewDirection(direction, value);
      rotationChange = rotateWaypoint(east, north, value);
      east = rotationChange.east;
      north = rotationChange.north;
      break;
    case 'F':
      shipEast += (east * value);
      shipNorth += (north * value);
      break;
  }
  return { east, north, direction, shipEast, shipNorth };
}

function rotateWaypoint(e, n, value) {
  let east = e;
  let north = n;
  for (let i=0; i<value/90; i++) {
    let tmp = east;
    east = north;
    north = tmp * -1;
  }
  return { east, north };
}

const DAY12 = 12;
parseData(DAY12, (input) => {
  const instructions = input.map(i => [ i.substring(0, 1), parseInt(i.substring(1)) ]);
  const headingPart1 = navigate(instructions, 'E');
  const headingPart2 = navigateWaypoint(instructions, 'E');
  const part1 = getManhattanDistance(headingPart1.east, headingPart1.north);
  const part2 = getManhattanDistance(headingPart2.east, headingPart2.north);
  showAnswers(DAY12, part1, part2);
});
