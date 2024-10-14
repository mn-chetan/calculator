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
  else if (operator == "%") return percent(firstNumber);
}

const arr = []; // Array to keep track of numbers and operators

// Function to let users enter number
function enterNumber() {
  // Display is where the numbers should be displayed
  const display = document.querySelector(".display");

  // When user clicks on a number show number on screen
  const numbers = document.querySelectorAll(".number");
  numbers.forEach((number) =>
    number.addEventListener("click", (e) => {
      display.textContent += e.target.textContent;
    })
  );
}

// Function to let users enter operator
function enterOperator() {
  // Display contains the current number on screen
  const display = document.querySelector(".display");

  // Get reference to all operators
  const operations = document.querySelectorAll(".operation");
  operations.forEach((operator) =>
    operator.addEventListener("click", (e) => {
      arr.push(display.textContent);
      arr.push(e.target.textContent);
    })
  );
}
