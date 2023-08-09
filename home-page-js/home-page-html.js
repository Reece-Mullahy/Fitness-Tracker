let gridDisplay = "";
let i = 0;

days.forEach((day) => {
  gridDisplay += `
  <div class="day">
    <div class="day-of-week">${day.day}</div>
    <div class="row-flex">
      <div class="category">Total Time (min)</div>
      <input type="number" class="user-input js-user-input${i}">
    </div>
    <div class="row-flex">
      <div class="category">Protein (g)</div>
      <input type="number" class="user-input js-user-protein${i}">
    </div>
    <div class="row-flex">
      <div class="category">Muscles Worked:</div>
      <input type="text" class="user-input-muscles js-user-muscles${i}">
    </div>
    <div class="row-flex">
      <div class="category">Cardio (min)</div>
      <input type="number" class="user-input js-user-cardio${i}">
    </div>
    <div class="row-flex-notes">
      <div class="category">Notes:</div>
      <textarea rows="3" cols="20" maxlength="130" class="user-input-notes js-user-notes${i}"></textarea>
    </div>
    <div class="save-container">
      <button class="save-button js-save-button${i}">Save</div>
    </div>
  </div>
  `
  i++;
});

document.querySelector('.js-days-grid')
  .innerHTML = gridDisplay;