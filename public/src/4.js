const CREDENTIALS = [
  'byr', // (Birth Year)
  'iyr', // (Issue Year)
  'eyr', // (Expiration Year)
  'hgt', // (Height)
  'hcl', // (Hair Color)
  'ecl', // (Eye Color)
  'pid', // (Passport ID)
  'cid' // (Country ID)
];

function getPart1Credentials() {
  return CREDENTIALS.map(c => {
    return {
      id: c,
      regex: new RegExp(`${c}:(#*.+?)\\b`, 'g'),
      optional: c === 'cid'
    };
  });
}

function getPart2Credentials() {
  return CREDENTIALS.map(c => {
    let requirement = { id: c, optional: false };
    switch(c) {
      case 'byr':
        requirement.regex = new RegExp(`${c}:(\\d{4})\\b`, 'g');
        requirement.isInRange = (byr) => { return byr >= 1920 && byr <= 2002 };
        break;
      case 'iyr':
        requirement.regex = new RegExp(`${c}:(\\d{4})\\b`, 'g');
        requirement.isInRange = (iyr) => { return iyr >= 2010 && iyr <= 2020 };
        break;
      case 'eyr':
        requirement.regex = new RegExp(`${c}:(\\d{4})\\b`, 'g');
        requirement.isInRange = (eyr) => { return eyr >= 2020 && eyr <= 2030 };
        break;
      case 'hgt':
        requirement.regex = new RegExp(`${c}:(\\d+(cm|in))\\b`, 'g');
        requirement.isInRange = (hgt) => {
          const height = hgt.substring(0, hgt.length - 2);
          const unit = hgt.substring(hgt.length - 2, hgt.length);
          return unit === 'cm' ? height >= 150 && height <= 193 : height >= 59 && height <= 76;
        };
        break;
      case 'hcl':
        requirement.regex = new RegExp(`${c}:(#[0-9a-f]{6})\\b`, 'g');
        break;
      case 'ecl':
        requirement.regex = new RegExp(`${c}:(amb|blu|brn|gry|grn|hzl|oth)\\b`, 'g');
        break;
      case 'pid':
        requirement.regex = new RegExp(`${c}:(\\d{9})\\b`, 'g');
        break;
      case 'cid':
        requirement.regex = new RegExp(`${c}:(#*.+?)\\b`, 'g');
        requirement.optional = true;
        break;
      default:
        requirement.regex = new RegExp(`${c}:(#*.+?)\\b`, 'g');
        break
    }
    return requirement;
  });
}

function createPassports(input) {
  return input.reduce((acc, cur, index) => {
    if (!acc.length || input[index-1] === '') {
      acc.push(cur);
    }
    else if (cur !== '') {
      let lastIndex = acc.length - 1;
      acc[lastIndex] = acc[lastIndex].concat(' ' + cur);
    }
    return acc;
  }, []);
}

function formatPassports(passports, credentialRequirements) {
  return passports.map(p => {
    let parsed = {};
    credentialRequirements.forEach(c => {
      c.regex.lastIndex = 0;
      let match = c.regex.exec(p);
      parsed[c.id] = match && match[1];
    });
    return parsed;
  });
}

function isValid(passport, credentialRequirements) {
  return !credentialRequirements.some(c => {
    let validRange = true;
    if (passport[c.id] && c.isInRange) {
      validRange = c.isInRange(passport[c.id]);
    }
    return (!passport[c.id] && !c.optional) || !validRange;
  });
}

const DAY4 = 4;
parseData(DAY4, (input) => {
  let passports = createPassports(input);

  const credentialRequirementsPart1 = getPart1Credentials();
  const part1 = formatPassports(passports, credentialRequirementsPart1)
    .filter(p => isValid(p, credentialRequirementsPart1)).length;

  const credentialRequirementsPart2 = getPart2Credentials();
  const part2 = formatPassports(passports, credentialRequirementsPart2)
    .filter(p => isValid(p, credentialRequirementsPart2)).length;
  showAnswers(DAY4, part1, part2);
});
