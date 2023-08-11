let allFields = JSON.parse(localStorage.getItem('allDays')) || allDays;

// call keepInputs to display previously entered data in the tracker
keepInputs();

// when user clicks on a save button, sortList and pushInputs are called to put current data into allFields list
// use local storage to save allFields list so it can be retrieved
for (let i = 0; i < allFields.length; i++) {
  let currSave = document.querySelector(`.js-save-button${i}`);

  currSave.addEventListener("click", () => {
    sortList();
    pushInputs(i);
    localStorage.setItem('allDays', JSON.stringify(allFields));
  })
};

// take values from each day and display these values in the tracker by using allFields
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

// put user inputed values for a specific day into allFields at correct index
// each index in allFields represents a day. 0 is Monday... 6 is Sunday
function pushInputs(i) {
  allFields[i].totalTime = +document.querySelector(`.js-user-input${i}`).value;
  allFields[i].protein = +document.querySelector(`.js-user-protein${i}`).value;
  allFields[i].muscles = document.querySelector(`.js-user-muscles${i}`).value;
  allFields[i].cardio = +document.querySelector(`.js-user-cardio${i}`).value;
  allFields[i].notes = document.querySelector(`.js-user-notes${i}`).value;
}

// sort list of objects by the day to keep in order
function sortList() {
  allFields.sort((day1, day2) => (day1.day > day2.day) ? 1 : (day1.day < day2.day) ? -1 : 0);
}