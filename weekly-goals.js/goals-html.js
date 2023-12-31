let allCategories = ["Avg Time Per Day", "Avg Protein Per Day", "Avg Cardio Per Day"];

let allUnits = ["Min", "G", "Min"];

let goalDisplay = "";
let i = 0;

// set the innerHTML where user can input goals for each category
allCategories.forEach((category) => {
  goalDisplay += `
    <div class="goal">
      <div class="category">${category}</div>
      <input type="number" class="set-goal js-set-goal${i}">
      <div class="units">${allUnits[i]}</div>
      <button class="save-goal js-save-goal${i}">Save</div>
    </div>
  `;
  i++;
});


document.querySelector(`.js-goals-grid`)
  .innerHTML = goalDisplay;

// generate the html for headers where daily average and weekly total progress will be displayed
let progressDisplay = `
<div class=progress-type>Daily Averages</div>
 <div class="progress-flex-headers">
  <div class="current-header">
    <div>Current</div>
  </div>
  <div class="goal-header">
    <div>Goal</div>
  </div>
  <div class="progress-to-goal-header"
    <div>Difference</div>
  </div>
 `;
let totalDisplay = `
<div class=progress-type>Weekly Totals</div>
 <div class="progress-flex-headers">
  <div class="current-header">
    <div>Current</div>
  </div>
  <div class="goal-header">
    <div>Goal</div>
  </div>
  <div class="progress-to-goal-header percentage"
    <div>% Goal</div>
  </div>
`;

let j = 0;
// generate the html for each category that will show how well user is performing on the goal they set
let allHeaders = ["Total Time (min)", "Protein (g)", "Cardio (min)"];
allHeaders.forEach((header) => {
  progressDisplay += `
  <div class="progress-flex">
    <div class="category-container">
      <div class="progress-category">${header}</div>
    </div>
    <div class="number-container">
      <div class="progress-curr-number js-curr-number${j}"></div>
    </div>
    <div class="goal-container">
      <div class="progress-goal js-progress-goal${j}"></div>
    </div>
    <div class="measure-container js-measure-container${j}">
      <div class="progress-measurement js-progress-measurement${j}"></div>
    </div>
  </div>
  `

  totalDisplay += `
  <div class="progress-flex">
    <div class="category-container">
      <div class="progress-category">${header}</div>
    </div>
    <div class="number-container">
      <div class="progress-curr-number js-total-number${j}"></div>
    </div>
    <div class="goal-container">
      <div class="progress-goal js-total-goal${j}"></div>
    </div>
    <div class="measure-container js-measure-container${j}">
      <div class="total-measurement js-total-measurement${j}"></div>
    </div>
  </div>
  `

  j++;
});

document.querySelector(`.js-progess-display`)
  .innerHTML = progressDisplay;

document.querySelector(`.js-totals-display`)
  .innerHTML = totalDisplay;