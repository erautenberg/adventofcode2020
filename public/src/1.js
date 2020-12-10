/**
  * Give "list" of numbers, finds "count" numbers in the list that add up to "sum,"
  * multiplies those numbers together, and returns the product.
  *
  * @param { number } sum
  * @param { number } count
  * @param { Array } list
  *
  * @return { number }
  */
function findProductOfAddends(list, sum, count) {
  if (count === 0) { return 1; }
  else if (count === 1) { return list.includes(sum) ? sum : 0; }
  else {
    let final = 0;
    // using some (instead of forEach) will stop looping as soon as it returns true
    list.some((n, index) => {
      // rremove the expense from the list to ensure it cannot be used multiple times
      let shortenedList = list.slice(0, index).concat(list.slice(index+1));
      let product = findProductOfAddends(shortenedList, sum - n, count - 1);
      if (product > 0) {
        final = product * n;
        return true;
      }
    });
    return final;
  }
}

function populateAnswers(day) {
  fetch('../input/1.txt')
    .then(res => res.text())
    .then(text => {
      const input = text.split('\n').map(n => parseInt(n));

      const part1 = findProductOfAddends(input, 2020, 2);
      consoleAnswers(day, 1, part1);
      document.getElementById('answer1').innerHTML = findProductOfAddends(input, 2020, 2);

      const part2 = findProductOfAddends(input, 2020, 3);
      consoleAnswers(day, 2, part2);
      document.getElementById('answer2').innerHTML = findProductOfAddends(input, 2020, 3);
    }
  );
}

populateAnswers(1);
