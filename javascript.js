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

// Function to enter numbers on to display
function enterNumber() {
  const display = document.querySelector(".display");

  const maxLength = 15; // Restrict digits to 15 to prevent display overflow

  const numbers = document.querySelectorAll(".number");
  numbers.forEach((number) =>
    number.addEventListener("click", (e) => {
      if (display.textContent.length < maxLength)
        display.textContent += e.target.textContent;
    })
  );
}

// Function to enter operator
function enterOperator() {
  const display = document.querySelector(".display");

  const operations = document.querySelectorAll(".operation");
  operations.forEach((operator) =>
    operator.addEventListener("click", (e) => {
      // Operator can be entered only when display has digits
      // Can't perform operations on nothing
      if (display.textContent) {
        arr.push(display.textContent);
        arr.push(e.target.textContent);
      }
    })
  );
}

function main() {
  enterNumber();
  enterOperator();
}
