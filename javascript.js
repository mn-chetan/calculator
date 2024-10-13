// Functions to perform mathematical operations
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function percent(a) {
  return a / 100;
}

// Function which calls the appropriate function based on user choice
function operate(operator, firstNumber, secondNumber) {
  if (operator == "+") return add(firstNumber, secondNumber);
  else if (operator == "-") return subtract(firstNumber, secondNumber);
  else if (operator == "*") return multiply(firstNumber, secondNumber);
  else if (operator == "/") return divide(firstNumber, secondNumber);
}

// Function to populate display
function populateDisplay() {
  const numbers = document.querySelectorAll(".number");
  // Get reference to display div to populate the display
  const display = document.querySelector(".display");

  let count = 0;

  numbers.forEach((number) =>
    number.addEventListener("click", (e) => {
      // Create an element to insert number onto display
      // Can display only 18 numbers given the display width
      // Display width = 274 px, Each span number = 14.86 px, 274 / 14.86 = 18.43
      if (count < 18) {
        const span = document.createElement("span");
        span.textContent = e.target.textContent;
        display.appendChild(span);
        count++;
      }
    })
  );
}
