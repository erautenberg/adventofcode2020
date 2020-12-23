function getSum(memory) {
  let sum = 0;
  for (const location in memory) {
    sum += memory[location];
  }
  return sum;
}

function parseInputV1(input) {
  return input.map(line => {
    let assignment = line.split(' = ')
    if (assignment[0] === 'mask') {
      return assignment[1];
    } else {
      let memory = parseInt(/\[(\d*)\]/.exec(assignment[0])[1]);
      let value = parseInt(assignment[1]).toString(2).padStart(36, '0');
      return [ memory, value ];
    }
  });
}

function executeProgramV1(program) {
  let mask;
  let memory = {};
  program.forEach(instruction => {
    if (typeof instruction === 'string') {
      mask = instruction;
    } else {
      memory[instruction[0]] = applyMaskV1(mask, instruction[1]);
    }
  });
  return memory;
}

function applyMaskV1(mask, value) {
  let maskedValue = '';
  for (let i=0; i<mask.length; i++) {
    maskedValue += (mask[i] === 'X' ? value[i] : mask[i]);
  }
  return parseInt(maskedValue, 2);
}

function parseInputV2(input) {
  return input.map(line => {
    let assignment = line.split(' = ')
    if (assignment[0] === 'mask') {
      return assignment[1];
    } else {
      let memory = parseInt(/\[(\d*)\]/.exec(assignment[0])[1]).toString(2).padStart(36, '0');
      let value = parseInt(assignment[1]);
      return [ memory, value ];
    }
  });
}

function executeProgramV2(program) {
  let mask;
  let maskFloatingCombos = [];
  let memory = {};
  program.forEach(instruction => {
    if (typeof instruction === 'string') {
      mask = instruction;
      maskFloatingCombos = getCombinations(mask.match(/X/g).length);
    } else {
      let maskedLocation = applyMaskV2(mask, instruction[0]);
      getAllLocations(maskFloatingCombos, maskedLocation).forEach(l => memory[l] = instruction[1]);
    }
  });
  return memory;
}

function getCombinations(length) {
  let combos = [];
  const count = 2**length;
  for (let i=0; i<count; i++) {
    combos.push(i.toString(2).padStart(length, '0'));
  }
  return combos;
}

function applyMaskV2(mask, location) {
  let maskedLocation = '';
  for (let i=0; i<mask.length; i++) {
    maskedLocation += (mask[i] === '0' ? location[i] : mask[i]);
  }
  return maskedLocation;
}

function getAllLocations(maskFloatingCombos, maskedLocation) {
  let locations = [];
  maskFloatingCombos.forEach(combo => {
    let l = '';
    for (let i=0, j=0; i<maskedLocation.length; i++) {
      l += maskedLocation[i] === 'X' ? combo[j++] : maskedLocation[i];
    }
    locations.push(parseInt(l, 2));
  });
  return locations;
}

const DAY14 = 14;
parseData(DAY14, (input) => {
  const part1 = getSum(executeProgramV1(parseInputV1(input)));
  const part2 = getSum(executeProgramV2(parseInputV2(input)));;
  showAnswers(DAY14, part1, part2);
});
