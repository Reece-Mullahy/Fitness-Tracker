let allFields = JSON.parse(localStorage.getItem('allDays')) || allDays;

let allGoals = JSON.parse(localStorage.getItem('allGoals')) || [
  {
    type: "time",
    goalNum: 0,
    goal: 0,
    weeklyGoal: 0
  },
  {
    type: "protein",
    goalNum: 1,
    goal: 0,
    weeklyGoal: 0
  },
  {
    type: "cardio",
    goalNum: 2,
    goal: 0,
    weeklyGoal: 0
  },
];

keepGoals();

for (let i = 0; i < allGoals.length; i++) {
  let saveGoal = document.querySelector(`.js-save-goal${i}`);

  saveGoal.addEventListener("click", () => {
    console.log(i);
    sortGoals();
    pushGoals(i);
    displayProgress();
    displayCharts();
    localStorage.setItem('allGoals', JSON.stringify(allGoals));
  });
};

let timeSum = 0;
let proteinSum = 0;
let cardioSum = 0;
let currTotals = [];
const date = new Date();
let today = date.getDay();

sortGoals();
getTotals();
setTotals();

let differences = [];
let percentages = [];
displayProgress();
displayCharts();

/*
--------------------------------------------------------------------------------------------------
*/

function displayCharts() {
  Chart.defaults.global.defaultFontFamily = "REM"
  let diffGraph = document.querySelector(`.js-difference-graph`).getContext("2d");
  new Chart(diffGraph, {
    type: 'bar',
    data: {
      labels: ['Total Time', 'Protein', 'Cardio'],
      datasets: [{
        label: 'Difference to Avg Goal',
        data: [
          differences[0], differences[1], differences[2]
        ],
        backgroundColor:  '#0d2c4e'
      }]
    },
    options: {
      responsive: false
    }
  });

  let percentageGraph = document.querySelector(`.js-percent-graph`).getContext("2d");
  new Chart(percentageGraph, {
    type: 'bar',
    data: {
      labels: ['Total Time', 'Protein', 'Cardio'],
      datasets: [{
        label: '% to Goal',
        data: [
          percentages[0], percentages[1], percentages[2]
        ],
        backgroundColor: '#0d2c4e'
      }]
    },
    options: {
      responsive: false,
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            min: 0,
            max: 100
          }
        }]
      }
    }
  });
};

function displayProgress() {
  for (let i = 0; i < allGoals.length; i++) {
    let avgProgress = document.querySelector(`.js-progress-measurement${i}`);
    let avgGoal = allGoals[i].goal;
    let avgCurr = Math.round((currTotals[i] / today)* 10) / 10;
    let diff = Math.round((avgCurr - avgGoal) * 10) / 10;
    differences[i] = diff;
    diff > 0 ? avgProgress.innerHTML = `+${diff}` : avgProgress.innerHTML = diff;

    let totalProgress = document.querySelector(`.js-total-measurement${i}`);
    let totalGoal = allGoals[i].goal * 7;
    let totalCurr = currTotals[i];
    percentages[i] = Math.round((totalCurr / totalGoal) * 100);
    totalProgress.innerHTML = `${Math.round((totalCurr / totalGoal) * 100)}%`;
  }
};

function getTotals() {
  for (let i = 0; i < allFields.length; i++) {
    timeSum += allFields[i].totalTime;
    proteinSum += allFields[i].protein;
    cardioSum += allFields[i].cardio;
  }
  currTotals[0] = timeSum;
  currTotals[1] = proteinSum;
  currTotals[2] = cardioSum;
};

function setTotals() {
  if (today == 0) {
    today = 7;
  }
  for (let i = 0; i < allGoals.length; i++) {
    document.querySelector(`.js-total-number${i}`).innerHTML = currTotals[i];
    document.querySelector(`.js-curr-number${i}`).innerHTML = Math.round((currTotals[i] / today) * 10) / 10;
  }
};

function pushGoals(i) {
    let weeklyGoal = +document.querySelector(`.js-set-goal${i}`).value;
    allGoals[i].goal = weeklyGoal;
    document.querySelector(`.js-progress-goal${i}`).innerHTML = weeklyGoal;
    allGoals[i].weeklyGoal = weeklyGoal * 7;
    document.querySelector(`.js-total-goal${i}`).innerHTML = weeklyGoal * 7;
};

function keepGoals() {
  sortGoals();
  for (let i = 0; i < allGoals.length; i++) {
    document.querySelector(`.js-set-goal${i}`).value = allGoals[i].goal;
    document.querySelector(`.js-progress-goal${i}`).innerHTML = allGoals[i].goal;
    document.querySelector(`.js-total-goal${i}`).innerHTML = allGoals[i].weeklyGoal;
  }
};

function sortGoals() {
  allGoals.sort((goal1, goal2) => (goal1.goalNum > goal2.goalNum) ? 1 : (goal1.goalNum < goal2.goalNum) ? -1 : 0);
};