// get user input data from tracker using JSON and local storage so these values can be used
let allFields = JSON.parse(localStorage.getItem('allDays')) || allDays;

// use local storage to retrieve target goals for the week
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

// for each save button, the page will save the goal entered in allGoals and update the progress and graphs from the values saved
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

// initialize variables that will be used in finding the daily averages and weekly totals
let timeSum = 0;
let proteinSum = 0;
let cardioSum = 0;
let currTotals = [];
const date = new Date();
let today = date.getDay();

// call getTotals() to put total values for the week in currTotals list
// call setTotals() to display current values for daily average and weekly total
sortGoals();
getTotals();
setTotals();

// use displayProgress() to display difference from goal and % to goal and put values in lists below
// call displaysCharts() to create graphs that display values obtained from previous function
let differences = [];
let percentages = [];
displayProgress();
displayCharts();

/*
--------------------------------------------------------------------------------------------------
*/

// create 2 graphs -> one that displays difference from the daily average goal and one for % progress on goal
function displayCharts() {
  Chart.defaults.global.defaultFontFamily = "REM"
  Chart.defaults.global.defaultFontSize = 15;
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

// set the innerHTML of daily average difference from difference between user average and goal
// set innerHTML for weekly total progress based on how much progress has been made as a %
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

// use values each day in tracker to find the total for total time, protein, and cardio and put these values in list
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

// set innerHTML to the value user has totaled in the week so far and use current day of the week to find daily average
function setTotals() {
  if (today == 0) {
    today = 7;
  }
  for (let i = 0; i < allGoals.length; i++) {
    document.querySelector(`.js-total-number${i}`).innerHTML = currTotals[i];
    document.querySelector(`.js-curr-number${i}`).innerHTML = Math.round((currTotals[i] / today) * 10) / 10;
  }
};

// put each goal entered into list where each index represents a different goal
function pushGoals(i) {
    let weeklyGoal = +document.querySelector(`.js-set-goal${i}`).value;
    allGoals[i].goal = weeklyGoal;
    document.querySelector(`.js-progress-goal${i}`).innerHTML = weeklyGoal;
    allGoals[i].weeklyGoal = weeklyGoal * 7;
    document.querySelector(`.js-total-goal${i}`).innerHTML = weeklyGoal * 7;
};

// use this function after retreiving list of goals from local storage to maintain innerHTML based on goals entered
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