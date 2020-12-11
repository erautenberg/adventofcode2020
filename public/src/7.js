function sortBagsByChild(input) {
  const regexSplit = /(.+?) bags contain /g;
  const regexRule = /(?<count>\d+?) (?<color>.*?) bag/;
  let rules = {};

  input.forEach(line => {
    let split = line.split(regexSplit);
    if (split[1]) {
      if (split[2]) {
        split[2].split(', ').forEach(rule => {
          regexRule.lastIndex = 0;
          let matches = regexRule.exec(rule);
          if (matches && matches.groups) {
            if (!rules[matches.groups.color]) {
              rules[matches.groups.color] = [];
            }
            rules[matches.groups.color].push({ [split[1]]: parseInt(matches.groups.count) });
          }
        });
      }
    }
  });
  return rules;
}

function sortBagsByParent(input) {
  const regexSplit = /(.+?) bags contain /g;
  const regexRule = /(?<count>\d+?) (?<color>.*?) bag/;
  let rules = {};

  input.forEach(line => {
    let split = line.split(regexSplit);
    if (split[1]) {
      let rulesArray = [];
      if (split[2]) {
        split[2].split(', ').forEach(rule => {
          regexRule.lastIndex = 0;
          let matches = regexRule.exec(rule);
          if (matches && matches.groups) {
            rulesArray.push({ [matches.groups.color]: parseInt(matches.groups.count) });
          }
        });
      }
      rules[split[1]] = rulesArray;
    }
  });
  return rules;
}

function getContainingBags(rules, bagColor, containingBags = []) {
  if (rules[bagColor]) {
    rules[bagColor].forEach(parentBag => {
      const parentBagColor = Object.keys(parentBag)[0];
      containingBags.push(parentBagColor);
      getContainingBags(rules, parentBagColor, containingBags);
    });
  }
  return filterDuplicates(containingBags);
}

function getContainingBagCount(rules, bagColor) {
  let count = 1;
  if (rules[bagColor] && rules[bagColor].length) {
    rules[bagColor].forEach(childBag => {
      const childBagColor = Object.keys(childBag)[0];
      let bagCount = childBag[childBagColor];
      count += (bagCount * getContainingBagCount(rules, childBagColor));
    });
  }
  return count;
}

const DAY7 = 7;
parseData(DAY7, (input) => {
  const part1 = getContainingBags(sortBagsByChild(input), 'shiny gold').length;
  const part2 = getContainingBagCount(sortBagsByParent(input), 'shiny gold') - 1;
  showAnswers(DAY7, part1, part2);
});
