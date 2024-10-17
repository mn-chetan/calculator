function enterNumber() {
  const maxLength = 17;

  const display = document.querySelector(".display");

  const numbers = document.querySelectorAll(".number");
  numbers.forEach((number) =>
    number.addEventListener("click", (e) => {
      if (display.textContent.length < maxLength)
        display.textContent += e.target.textContent;
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
