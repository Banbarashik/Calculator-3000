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
    displayPanel.innerHTML = displayValue.join("");
  });
});

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
  button.addEventListener("click", fillExpression);
});

let valueA;
let valueB;
function fillExpression(event, a, b) {
  if (!valueA) {
    valueA = displayValue.join("");
    displayValue = [];
  } else if (!valueB) {
    valueB = displayValue.join("");
    displayValue = [];
  } else if (valueA && valueB) {
    if ((event.target.value = "+")) {
      add(valueA, valueB);
    }
  }
}
