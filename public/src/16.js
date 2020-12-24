function isInRange(range, n) {
  return (n >= range[0] && n <= range[1]) || (n >= range[2] && n <= range[3]);
}

function checkIfValid(rules, n) {
  for (const field in rules) {
    if (isInRange(rules[field], n)) {
      return true;
    }
  }
  return false;
}

function getInvalidValues(rules, ticket) {
  return ticket.filter(n => !checkIfValid(rules, n));
}

function getSumOfInvalidTicketValues(rules, nearbyTickets) {
  return nearbyTickets.map(ticket => getInvalidValues(rules, ticket)).flat()
    .reduce((acc, cur) => acc + cur, 0);
}

function removeDuplicateRulesInPosition(possibleRulePos) {
  let completedRules = [];
  let position, rule;
  while (possibleRulePos.length > completedRules.length) {
    position = possibleRulePos.find(p => p.length === 1 && completedRules.indexOf(p[0]) === -1);
    if (position) {
      rule = position[0];
      possibleRulePos.forEach((p, index) => {
        if (p.length > 1) {
          possibleRulePos[index] = p.filter(r => r !== rule);
        }
      });
      completedRules.push(rule);
    }
  }
  return possibleRulePos;
}

function getRuleOrder(rules, yourTicket, nearbyTickets) {
  let possibleRulePos = [];
  for (let i=0; i<yourTicket.length; i++) {
    for (const field in rules) {
      if (isInRange(rules[field], yourTicket[i])) {
        if (!nearbyTickets.find(t => !isInRange(rules[field], t[i]))) {
          if (possibleRulePos[i] && possibleRulePos[i].length) {
            possibleRulePos[i].push(field);
          } else {
            possibleRulePos.push([ field ]);
          }
        }
      }
    }
  }
  return removeDuplicateRulesInPosition(possibleRulePos).flat();
}

function multiplyDepartures(ruleOrder, ticket) {
  let product = 1;
  ruleOrder.forEach((rule, index) => {
    if (rule.includes('departure')) {
      product *= ticket[index];
    }
  });
  return product;
}

function getProductOfDepartures(rules, yourTicket, nearbyTickets) {
  let validTickets = nearbyTickets.filter(t => !t.some(n => !checkIfValid(rules, n)));
  let ruleOrder = getRuleOrder(rules, yourTicket, validTickets);
  return multiplyDepartures(ruleOrder, yourTicket);
}

const DAY16 = 16;
parseData(DAY16, (input) => {
  let rules = {};
  let yourTicket;
  let nearbyTickets = [];

  let regex = /(.*?): (\d+)-(\d+) or (\d+)-(\d+)/g;
  let nextLineIsYourTicket = false;

  input.forEach(line => {
    regex.lastIndex = 0;
    let matches = regex.exec(line);
    if (line !== '') {
      if (matches && matches.length === 6) {
        rules[matches[1]] = matches.slice(2).map(n => parseInt(n));
      } else if (line === 'your ticket:') {
        nextLineIsYourTicket = true;
      } else {
        if (nextLineIsYourTicket) {
          yourTicket = line.split(',').map(n => parseInt(n));
          nextLineIsYourTicket = false;
        } else if (line !== 'nearby tickets:') {
          nearbyTickets.push(line.split(',').map(n => parseInt(n)));
        }
      }
    }
  });

  const part1 = getSumOfInvalidTicketValues(rules, nearbyTickets);
  const part2 = getProductOfDepartures(rules, yourTicket, nearbyTickets);
  showAnswers(DAY16, part1, part2);
});
