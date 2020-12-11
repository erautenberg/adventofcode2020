function getQuestionCount(group) {
  // simplifies the questions into one array, then one string, then into an array of characters
  const questions = group.flat().join('').split('');
  // filters out any duplicates in the questions and returns the amount
  return questions.filter((q, index) => questions.indexOf(q) === index).length;
}

function getUnanimousQuestionCount(group) {
  // if there is only one person in the group, return their answers questions
  if (group.length === 1) {
    return group[0].length;
  }
  // compare each question of the 1st person to see if every other person also answered yes
  else {
    let remainingPeople = group;
    let firstPerson = remainingPeople.shift();
    return firstPerson.split('').filter(question =>
      remainingPeople.every(p => p.includes(question))).length;
  }
}

const DAY6 = 6;
parseData(DAY6, (input) => {
  const groups = input.reduce((acc, cur) => {
    !cur ? acc.push([]) : acc[acc.length - 1].push(cur);
    return acc;
  }, [[]]);

  const part1 = groups.reduce((acc, cur) => acc + getQuestionCount(cur), 0);
  const part2 = groups.reduce((acc, cur) => acc + getUnanimousQuestionCount(cur), 0);
  showAnswers(DAY6, part1, part2);
});
