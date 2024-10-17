let calculationArray = [];
let operatorPressed = false;

function enterNumber() {
  const maxLength = 17; // User can enter only 17 before display overflows

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
      if (display.textContent) {
        operatorPressed = true;

        // Push the current number into array
        calculationArray.push(display.textContent);
        // Push the operator into the array
        calculationArray.push(e.target.textContent);
      }
    })
  );
}

function main() {
  enterNumber();
  enterDecimal();
  enterOperator();
}

main();
