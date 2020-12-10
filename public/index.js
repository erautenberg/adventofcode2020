function consoleAnswers(day, part, answer) {
  console.log(`Day ${day}, Part ${part}: ${answer}`);
}

function showAnswers(day, part1, part2) {
  consoleAnswers(day, 1, part1);
  document.getElementById('answer1').innerHTML = part1;
  consoleAnswers(day, 2, part2);
  document.getElementById('answer2').innerHTML = part2;
}

function parseData(day, callback) {
  fetch(`../input/${day}.txt`)
    .then(res => res.text())
    .then(text => callback(text.split('\n')));
}

// NAVIGATION
function makeNavigation(days) {
  let nav = document.getElementById('nav');
  if (document.location.pathname !== '/') {
    nav.appendChild(makeHyperlink('View All', ''));
  }
  for (let i=1; i<=days; i++) {
    nav.appendChild(makeHyperlink(`Day ${i}`, `days/${i}.html`));
  }
}

function makeHyperlink(title, location) {
  let list = document.createElement('li');
  let link = document.createElement('a');
  link.href = `http://${window.location.host}/${location}`;
  link.innerHTML = title;
  list.appendChild(link);
  return list;
}

makeNavigation(3);
