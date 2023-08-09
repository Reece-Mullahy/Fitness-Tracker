let allFields = JSON.parse(localStorage.getItem('allDays')) || allDays;

keepInputs();

for (let i = 0; i < allFields.length; i++) {
  let currSave = document.querySelector(`.js-save-button${i}`);

  currSave.addEventListener("click", () => {
    sortList();
    pushInputs(i);
    localStorage.setItem('allDays', JSON.stringify(allFields));
  })
};

function keepInputs() {
  sortList();
  for (let i = 0; i < allFields.length; i++) {
    document.querySelector(`.js-user-input${i}`).value = allFields[i].totalTime;
    document.querySelector(`.js-user-protein${i}`).value = allFields[i].protein;
    document.querySelector(`.js-user-muscles${i}`).value = allFields[i].muscles;
    document.querySelector(`.js-user-cardio${i}`).value = allFields[i].cardio;
    document.querySelector(`.js-user-notes${i}`).value = allFields[i].notes;
  }
};

function pushInputs(i) {
  allFields[i].totalTime = +document.querySelector(`.js-user-input${i}`).value;
  allFields[i].protein = +document.querySelector(`.js-user-protein${i}`).value;
  allFields[i].muscles = document.querySelector(`.js-user-muscles${i}`).value;
  allFields[i].cardio = +document.querySelector(`.js-user-cardio${i}`).value;
  allFields[i].notes = document.querySelector(`.js-user-notes${i}`).value;
}

function sortList() {
  allFields.sort((day1, day2) => (day1.day > day2.day) ? 1 : (day1.day < day2.day) ? -1 : 0);
}
