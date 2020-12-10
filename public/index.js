function consoleAnswers(day, part, answer) {
  console.log(`Day ${day}, Part ${part}: ${answer}`);
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

makeNavigation(1);
