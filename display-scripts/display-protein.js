let allProtein = JSON.parse(localStorage.getItem('protein')) || [
  {day: 0, protein: 0},
  {day: 1, protein: 0},
  {day: 2, protein: 0},
  {day: 3, protein: 0},
  {day: 4, protein: 0},
  {day: 5, protein: 0},
  {day: 6, protein: 0}
];

keepProtein();

console.log(allProtein);

for (let i = 0; i <= 6; i++) {
  let currDay = document.querySelector(`.js-user-protein${i}`);

  currDay.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      let removeDay = isPresent(i);
      if (removeDay != -1) {
        allProtein.splice(removeDay, 1);
      }
      allProtein.push({
        day: i,
        protein: +currDay.value
      })

      console.log(allProtein);
      localStorage.setItem('protein', JSON.stringify(allProtein));
    }
  });
};


function keepProtein() {
  allProtein.sort((day1, day2) => (day1.day > day2.day) ? 1 : (day1.day < day2.day) ? -1 : 0);

  for (let i = 0; i < allProtein.length - 1; i++) {
    if (allProtein[i].day == allProtein[i+1].day) {
      allProtein.splice(i+1, 1);
    }
  }

  for (let i = 0; i < allProtein.length; i++) {
    let currDay = document.querySelector(`.js-user-protein${i}`);
    currDay.value = allProtein[i].protein;
  }
}

// checks if the user already logged protein in for day of the week
// if present return the index in allProtein
// this index will be removed in the list during event listener so one day doesn't contain multiple values for protein
function isPresent(i) {
  for (let j = 0; j < allProtein.length; j++) {
    if (allProtein[j].day == i) {
      return j;
    }
  }
  return -1;
}