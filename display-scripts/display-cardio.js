let allCardio = JSON.parse(localStorage.getItem('cardio')) || [
  {day: 0, cardio: 0},
  {day: 1, cardio: 0},
  {day: 2, cardio: 0},
  {day: 3, cardio: 0},
  {day: 4, cardio: 0},
  {day: 5, cardio: 0},
  {day: 6, cardio: 0}
];

keepCardio();

for (let i = 0; i <= 6; i++) {
  let currDay = document.querySelector(`.js-user-cardio${i}`);

  currDay.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      let removeDay = isPresent(i);
      if (removeDay != -1) {
        allCardio.splice(removeDay, 1);
      }
      allCardio.push({
        day: i,
        cardio: +currDay.value
      })
      localStorage.setItem('cardio', JSON.stringify(allCardio));
    }
  });
};

function keepCardio() {
  allCardio.sort((day1, day2) => (day1.day > day2.day) ? 1 : (day1.day < day2.day) ? -1 : 0);

  for (let i = 0; i < allCardio.length; i++) {
    let currDay = document.querySelector(`.js-user-cardio${i}`);
    currDay.value = allCardio[i].cardio;
  }
};

function isPresent(i) {
  for (let j = 0; j < allCardio.length; j++) {
    if (allCardio[j].day == i) {
      return j;
    }
  }
  return -1;
};