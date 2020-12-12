function findLoop(bootCode) {
  let acc = 0;
  let executedLines = [];
  let i = 0;
  while (bootCode[i] && !executedLines.find(line => line === i)) {
    let instruction = bootCode[i][0];
    let mod = bootCode[i][1];
    executedLines.push(i);
    switch (instruction) {
      case 'acc':
        acc += mod;
        i++;
        break;
      case 'jmp':
        i += mod;
        break;
      case 'nop':
        i++
        break;
    }
  }
  return { executedLines, acc, finished: i === bootCode.length };
}

function changeLine(bootCode, lines) {
  for(let i=lines.length-1; i>=0; i--) {
    let newBootCode = [...bootCode];
    if (newBootCode[lines[i]][0] === 'jmp') {
      newBootCode[lines[i]][0] = 'nop';
    } else if (newBootCode[lines[i]][0] === 'nop') {
      newBootCode[lines[i]][0] = 'jmp';
    }
    const programSequence = findLoop(newBootCode);
    if (programSequence.finished) {
      return programSequence.acc;
    }
  }
}

const DAY8 = 8;
parseData(DAY8, (input) => {
  const bootCode = input.map(i => {
    let str = i.split(' ');
    return [ str[0], parseInt(str[1])];
  })
  let infiniteLoop = findLoop(bootCode);
  const part1 = infiniteLoop.acc;
  const part2 = changeLine(bootCode, infiniteLoop.executedLines);
  showAnswers(DAY8, part1, part2);
});
