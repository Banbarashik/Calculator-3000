const allButtons = document.querySelectorAll("button");
const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".number");
const point = document.querySelector("#point");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector("#equal");
const clear = document.querySelector("#clear");
let prevValue;
let displayPrevValue;
let currentOperator;
let result = true; //subject to change
let indicator = false;

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

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (display.textContent.length < 20) {
      if (displayPrevValue && result) {
        displayPrevValue = "";
        display.textContent = displayPrevValue;
        indicator = false;
      }
      display.textContent += e.target.value;

      if (e.target.value === ".") {
        point.setAttribute("disabled", "");
      }
    }
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    if (currentOperator === e.target.value && !indicator && result) {
      result = operate(currentOperator, +prevValue, +display.textContent);
      indicator = true;
      display.textContent = parseFloat(result.toFixed(10));
      displayPrevValue = true;
      currentOperator = "";
      point.removeAttribute("disabled", "");
    } else {
      currentOperator = e.target.value;
      prevValue = display.textContent;
      displayPrevValue = prevValue;
      display.textContent = displayPrevValue;
    }

    if (document.querySelector(".current-operator")) {
      document
        .querySelector(".current-operator")
        .classList.remove("current-operator");
    }
    e.target.classList.add("current-operator");
  });
});

equal.addEventListener("click", () => {
  if (currentOperator === "" || indicator === true) {
    return;
  }
  if (currentOperator) {
    result = operate(currentOperator, +prevValue, +display.textContent);
    display.textContent = parseFloat(result.toFixed(10));
    prevValue = result;
    indicator = true;
    currentOperator = "";
    displayPrevValue = true;
    point.removeAttribute("disabled", "");

    if (result === Infinity) {
      display.textContent = "The wasteland has claimed your life.";
    }

    document
      .querySelector(".current-operator")
      .classList.remove("current-operator");
  }
});

clear.addEventListener("click", () => {
  prevValue = "";
  displayPrevValue = "";
  display.textContent = "";
  result = true;
  indicator = false;
  point.removeAttribute("disabled", "");

  document
    .querySelector(".current-operator")
    .classList.remove("current-operator");
});

const highlightSound = document.querySelector("#highlight");
const selectSound = document.querySelector("#select");
function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
allButtons.forEach((button) => {
  button.addEventListener("mouseover", () => playSound(highlightSound));
  button.addEventListener("click", () => playSound(selectSound));
});
