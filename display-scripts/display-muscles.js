let allMuscles = JSON.parse(localStorage.getItem('muscles')) || [
  {day: 0, muscles: ""},
  {day: 1, muscles: ""},
  {day: 2, muscles: ""},
  {day: 3, muscles: ""},
  {day: 4, muscles: ""},
  {day: 5, muscles: ""},
  {day: 6, muscles: ""}
];

keepMuscles();

console.log(allMuscles);

for (let i = 0; i <= 6; i++) {
  let currDay = document.querySelector(`.js-user-muscles${i}`);

  currDay.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      let removeDay = isPresent(i);
      if (removeDay != -1) {
        allMuscles.splice(removeDay, 1);
      }
      allMuscles.push({
        day: i,
        muscles: currDay.value
      })
      console.log(allMuscles);
      localStorage.setItem('muscles', JSON.stringify(allMuscles));
    }
  });
};

function keepMuscles() {
  allMuscles.sort((day1, day2) => (day1.day > day2.day) ? 1 : (day1.day < day2.day) ? -1 : 0);

  for (let i = 0; i < allMuscles.length - 1; i++) {
    if (allMuscles[i].day == allMuscles[i+1].day) {
      allMuscles.splice(i+1, 1);
    }
  }

  for (let i = 0; i < allMuscles.length; i++) {
    let currDay = document.querySelector(`.js-user-muscles${i}`);
    currDay.value = allMuscles[i].muscles;
  }
}

function isPresent(i) {
  for (let j = 0; j < allMuscles.length; j++) {
    if (allMuscles[j].day == i) {
      return j;
    }
  }
  return -1;
}