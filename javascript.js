let calculationArray = [];
let operatorPressed = false;

function enterNumber() {
  const maxLength = 17; // Limit input length to prevent display overflow

  const display = document.querySelector(".display");

  const numbers = document.querySelectorAll(".number");
  numbers.forEach((number) =>
    number.addEventListener("click", (e) => {
      if (display.textContent.length < maxLength) {
        if (operatorPressed) {
          display.textContent = "";
          operatorPressed = false;
        }
        display.textContent += e.target.textContent;
      }
    })
  );
}

function enterDecimal() {
  const display = document.querySelector(".display");

  const decimal = document.querySelector(".decimal");
  decimal.addEventListener("click", () => {
    if (display.textContent.indexOf(".") == -1) display.textContent += ".";
  });
}

function enterOperator() {
  const display = document.querySelector(".display");

  const operators = document.querySelectorAll(".operator");
  operators.forEach((operator) =>
    operator.addEventListener("click", (e) => {
      // After =, calculatorArray contains 1 digit
      // In that case just push operator
      // Else push number and operator
      if (calculationArray.length == 1) {
        operatorPressed = true;
        calculationArray.push(e.target.textContent);
      } else if (display.textContent) {
        operatorPressed = true;
        calculationArray.push(display.textContent);
        calculationArray.push(e.target.textContent);
      }

      // When user enters an operator without clicking =, display the result first
      if (calculationArray.length == 4) {
        const result = operate(
          calculationArray[1],
          Number(calculationArray[0]),
          Number(calculationArray[2])
        );
        display.textContent = result;
        calculationArray.splice(0, 3, result);
      }
    })
  );
}

function enterEqual() {
  const display = document.querySelector(".display");

  const equal = document.querySelector(".equal");
  equal.addEventListener("click", () => {
    if (calculationArray.length == 2) {
      calculationArray.push(display.textContent);
      const result = operate(
        calculationArray[1],
        Number(calculationArray[0]),
        Number(calculationArray[2])
      );
      display.textContent = result;
      calculationArray.splice(0, 3, result);
    }
  });
}

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
  if (b == 0) return "Don't Even Try";
  return a / b;
}

function percent(a) {
  return a / 100;
}

function operate(operator, a, b) {
  if (operator == "+") return add(a, b);
  else if (operator == "-") return subtract(a, b);
  else if (operator == "*") return multiply(a, b);
  else if (operator == "/") return divide(a, b);
}

function main() {
  enterNumber();
  enterDecimal();
  enterOperator();
  enterEqual();
}

main();
