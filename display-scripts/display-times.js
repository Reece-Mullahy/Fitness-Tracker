let allTimes = JSON.parse(localStorage.getItem('times')) || [
  {day: 0, time: 0},
  {day: 1, time: 0},
  {day: 2, time: 0},
  {day: 3, time: 0},
  {day: 4, time: 0},
  {day: 5, time: 0},
  {day: 6, time: 0}
];

keepTimes();

console.log(allTimes);

for (let i = 0; i <= 6; i++) {
  let currDay = document.querySelector(`.js-user-input${i}`);

  currDay.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      let removeDay = isPresent(i);
      if (removeDay != -1) {
        allTimes.splice(removeDay, 1);
      }
      allTimes.push({
        day: i,
        time: +currDay.value
      })
      console.log(allTimes);

      localStorage.setItem('times', JSON.stringify(allTimes));
    }
  });
};



function keepTimes() {
  allTimes.sort((day1, day2) => (day1.day > day2.day) ? 1 : (day1.day < day2.day) ? -1 : 0);

  for (let i = 0; i < allTimes.length; i++) {
    let currDay = document.querySelector(`.js-user-input${i}`);
    currDay.value = allTimes[i].time;
  }
};

function isPresent(i) {
  for (let j = 0; j < allTimes.length; j++) {
    if (allTimes[j].day == i) {
      return j;
    }
  }
  return -1;
};