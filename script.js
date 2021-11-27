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

function operate(op, a, b) {
  if (op === "+") {
    return add(a, b);
  } else if (op === "-") {
    return subtract(a, b);
  } else if (op === "*") {
    return multiply(a, b);
  } else if (op === "/") {
    return divide(a, b);
  }
}

const displayPanel = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".number");
let displayValue = [];
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    displayValue.push(button.value);
    displayPanel.textContent = displayValue.join("");
  });
});

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
  button.addEventListener("click", fillExpression);
});

let valueA;
let valueB;
let currentOperator;
let result;
function fillExpression(event) {
  if (result) {
    valueA = result;
    valueB = 0;
    currentOperator = event.target.value;
  }
  if (!valueA) {
    valueA = Number(displayValue.join(""));
    displayValue = [];
    currentOperator = event.target.value;
  } else if (!valueB) {
    valueB = Number(displayValue.join(""));
    displayValue = [];
  }

  //   if (valueA && valueB && event.target.value === "=") {
  //     result = operate(currentOperator, valueA, valueB);
  //     displayPanel.textContent = result;
  // valueA = result;
  // valueB = '';
  // }
  const equal = document.querySelector('button[value="="]');
  equal.addEventListener("click", () => {
    valueB = Number(displayValue.join(""));
    result = operate(currentOperator, valueA, valueB);
    displayPanel.textContent = result;
  });
}
