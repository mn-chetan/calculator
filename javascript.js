let calculationArray = []; // Store the numbers and operators for calculations
let operatorPressed = false; // Track if an operator was pressed to clear the display for the next input

function enterNumber() {
  const maxLength = 17; // Limit input length to prevent display overflow

  const display = document.querySelector(".display"); // Get the display element

  const numbers = document.querySelectorAll(".number"); // Get all number buttons
  numbers.forEach((number) =>
    number.addEventListener("click", (e) => {
      // Limit input to 17 digits
      if (display.textContent.length < maxLength) {
        // Clear the display if an operator was pressed
        if (operatorPressed) {
          display.textContent = "";
          operatorPressed = false;
        } // Append the clicked number to the display
        display.textContent += e.target.textContent;
      }
    })
  );
}

function enterDecimal() {
  const display = document.querySelector(".display"); // Get the display element

  const decimal = document.querySelector(".decimal"); // Get the decimal button
  decimal.addEventListener("click", () => {
    // Ensure that only one decimal point is added
    if (display.textContent.indexOf(".") == -1) {
      display.textContent += ".";
    }
  });
}

function enterOperator() {
  const display = document.querySelector(".display"); // Get the display element

  const operators = document.querySelectorAll(".operator"); // Get all operator buttons
  operators.forEach((operator) =>
    operator.addEventListener("click", (e) => {
      // Handle the percentage operator separately
      if (e.target.textContent === "%") {
        let number = Number(display.textContent); // Get the current number from display
        let percentageResult = percent(number); // Calculate the percentage
        display.textContent = percentageResult; // Show the result
        return; // Exit to prevent further operator logic
      } // If calculationArray contains one element, add the operator only

      if (calculationArray.length == 1) {
        operatorPressed = true;
        calculationArray.push(e.target.textContent);
      } else if (display.textContent) {
        // If display contains a number, add it and the operator to calculationArray
        operatorPressed = true;
        calculationArray.push(display.textContent);
        calculationArray.push(e.target.textContent);
      } // If there are 4 elements in calculationArray, calculate the result

      if (calculationArray.length == 4) {
        const result = operate(
          calculationArray[1], // Operator
          Number(calculationArray[0]), // First number
          Number(calculationArray[2]) // Second number
        );
        display.textContent = result; // Display the result
        calculationArray.splice(0, 3, result); // Replace first 3 elements with the result
      }
    })
  );
}

function enterEqual() {
  const display = document.querySelector(".display"); // Get the display element

  const equal = document.querySelector(".equal"); // Get the equal button
  equal.addEventListener("click", () => {
    // If calculationArray has 2 elements, complete the calculation
    if (calculationArray.length == 2) {
      calculationArray.push(display.textContent); // Add the second number
      const result = operate(
        calculationArray[1], // Operator
        Number(calculationArray[0]), // First number
        Number(calculationArray[2]) // Second number
      );
      display.textContent = result; // Display the result
      calculationArray.splice(0, 3, result); // Replace first 3 elements with the result
    }
  });
}

function enterClear() {
  const display = document.querySelector(".display"); // Get the display element

  const clear = document.querySelector(".clear"); // Get the clear button
  clear.addEventListener("click", () => {
    calculationArray.splice(0, calculationArray.length); // Clear the calculation array
    display.textContent = ""; // Clear the display
  });
}

function enterBackspace() {
  const display = document.querySelector(".display"); // Get the display element

  const backspace = document.querySelector(".backspace"); // Get the backspace button
  backspace.addEventListener("click", () => {
    const number = display.textContent.split(""); // Split the display content into an array
    number.splice(-1, 1); // Remove the last digit
    const result = number.join(""); // Join the array back into a string
    display.textContent = result; // Display the result
  });
}

function add(a, b) {
  const result = a + b; // Perform addition
  return roundDisplay(result); // Round the result for display
}

function subtract(a, b) {
  const result = a - b; // Perform subtraction
  return roundDisplay(result); // Round the result for display
}

function multiply(a, b) {
  const result = a * b; // Perform multiplication
  return roundDisplay(result); // Round the result for display
}

function divide(a, b) {
  if (b == 0) return "Don't Even Try"; // Prevent division by zero
  const result = a / b; // Perform division
  return roundDisplay(result); // Round the result for display
}

function percent(a) {
  return a / 100; // Calculate percentage
}

function operate(operator, a, b) {
  // Determine the operator and call the corresponding function
  if (operator == "+") return add(a, b);
  else if (operator == "-") return subtract(a, b);
  else if (operator == "*") return multiply(a, b);
  else if (operator == "/") return divide(a, b);
}

function roundDisplay(number) {
  const numberStr = String(number); // Convert the number to a string
  const decimalIndex = numberStr.indexOf("."); // Get the index of the decimal point
  const scientificIndex = numberStr.indexOf("e"); // Get the index of scientific notation

  if (decimalIndex === -1) {
    // If there is no decimal point
    return numberStr.length < 18 ? number : NaN; // Return NaN if number is too long
  } else {
    if (decimalIndex > 16) return NaN; // Return NaN if the number exceeds the max length

    const precision = 16 - decimalIndex; // Calculate precision for rounding
    if (scientificIndex === -1) {
      // If the number is not in scientific notation
      return number.toFixed(precision); // Return the rounded number
    } else {
      // If the number is in scientific notation
      return scientificIndex < 17 ? number.toFixed(precision) : NaN; // Return NaN if too long
    }
  }
}

function main() {
  enterNumber(); // Add event listeners for numbers
  enterDecimal(); // Add event listener for decimal point
  enterOperator(); // Add event listeners for operators
  enterEqual(); // Add event listener for equal button
  enterClear(); // Add event listener for clear button
  enterBackspace(); // Add event listener for backspace button
}

main(); // Initialize the calculator
