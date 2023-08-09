// add feature when user clicks on a save button, the button reverses colors and displays "Saved!" for 1.5 seconds before returning to original display
for (let i = 0; i <= 6; i++) {
  let currButton = document.querySelector(`.js-save-button${i}`);
  currButton.addEventListener("click", () => {
    currButton.innerHTML = "Saved!";
    currButton.classList.add('input-saved');

    setTimeout(reverseBack, 1500, currButton);
  });
};

// set innerHTML and CSS properties back to orginal displays
function reverseBack(currButton) {
  currButton.innerHTML = "Save";
  currButton.classList.remove('input-saved');
};