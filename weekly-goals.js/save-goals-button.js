// add feature when user clicks on a save button, the button reverses colors and displays "Saved!" for 1.5 seconds before returning to original display
for (let i = 0; i <= 2; i++) {
  let goalButton = document.querySelector(`.js-save-goal${i}`);
  goalButton.addEventListener("click", () => {
    goalButton.innerHTML = "Saved!";
    goalButton.classList.add('goal-saved');

    setTimeout(reverseBack, 1500, goalButton);
});
};

// set innerHTML and CSS properties back to orginal displays
function reverseBack(goalButton) {
  goalButton.innerHTML = "Save";
  goalButton.classList.remove('goal-saved');
};