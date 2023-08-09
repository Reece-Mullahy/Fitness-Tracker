for (let i = 0; i <= 2; i++) {
  let goalButton = document.querySelector(`.js-save-goal${i}`);
  goalButton.addEventListener("click", () => {
    goalButton.innerHTML = "Saved!";
    goalButton.classList.add('goal-saved');

    setTimeout(reverseBack, 1500, goalButton);
});
};

function reverseBack(goalButton) {
  goalButton.innerHTML = "Save";
  goalButton.classList.remove('goal-saved');
};