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
    if (display.textContent.indexOf(".") == -1) {
      display.textContent += ".";
    }
  });
}

function enterOperator() {
  const display = document.querySelector(".display");

  const operators = document.querySelectorAll(".operator");
  operators.forEach((operator) =>
    operator.addEventListener("click", (e) => {
      // Handle percentage operator separately
      if (e.target.textContent === "%") {
        let number = Number(display.textContent);
        let percentageResult = percent(number); // Use the percent function
        display.textContent = percentageResult;
        return; // Exit early to prevent further operator logic
      }

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

function enterClear() {
  const display = document.querySelector(".display");

  const clear = document.querySelector(".clear");
  clear.addEventListener("click", () => {
    calculationArray.splice(0, calculationArray.length);
    display.textContent = "";
  });
}

function enterBackspace() {
  const display = document.querySelector(".display");

  const backspace = document.querySelector(".backspace");
  backspace.addEventListener("click", () => {
    const number = display.textContent.split("");
    number.splice(-1, 1);
    const result = number.join("");
    display.textContent = result;
  });
}

function add(a, b) {
  const result = a + b;
  return roundDisplay(result);
}

function subtract(a, b) {
  const result = a - b;
  return roundDisplay(result);
}

function multiply(a, b) {
  const result = a * b;
  return roundDisplay(result);
}

function divide(a, b) {
  if (b == 0) return "Don't Even Try";
  const result = a / b;
  return roundDisplay(result);
}

function percent(a) {
  const result = a / 100;
  return percent(result);
}

function operate(operator, a, b) {
  if (operator == "+") return add(a, b);
  else if (operator == "-") return subtract(a, b);
  else if (operator == "*") return multiply(a, b);
  else if (operator == "/") return divide(a, b);
}

function roundDisplay(number) {
  if (String(number).indexOf(".") == -1) {
    if (String(number) < 18) return number;
    else return NaN;
  } else {
    if (String(number).indexOf(".") >= 16) return NaN;
    else return number.toFixed(16 - String(number).indexOf("."));
  }
}

function main() {
  enterNumber();
  enterDecimal();
  enterOperator();
  enterEqual();
  enterClear();
  enterBackspace();
}

main();
