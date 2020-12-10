function isPasswordValid1(p) {
  const length = p.password.split(p.char).length - 1;
  return p.min <= length && p.max >= length;
}

function isPasswordValid2(p) {
  const inFirst = p.char === p.password[p.min - 1];
  const inSecond = p.char === p.password[p.max - 1];
  return inFirst ? !inSecond : inSecond;
}

const DAY2 = 2;
parseData(DAY2, (input) => {
  const regex = /(?<min>\d+)-(?<max>\d+) (?<char>\w): (?<password>.*)/g;
  let passwords = input.map(p => {
    regex.lastIndex = 0;
    let match = regex.exec(p);
    if (match) { return match.groups; }
  });
  const part1 = passwords.filter(p => isPasswordValid1(p)).length;
  const part2 = passwords.filter(p => isPasswordValid2(p)).length;
  showAnswers(DAY2, part1, part2);
});
