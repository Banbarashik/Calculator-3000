const allButtons = document.querySelectorAll("button");
const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".number");
const point = document.querySelector("#point");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector("#equal");
const clearBtn = document.querySelector("#clear");
const colorSwitchCheckbox = document.querySelector("#color-switch-checkbox");
const soundSwitchCheckbox = document.querySelector("#sound-switch-checkbox");
const root = document.documentElement;
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
      if (
        displayPrevValue !== null &&
        displayPrevValue !== "" &&
        result !== null &&
        result !== "" &&
        display.textContent !== "-"
      ) {
        displayPrevValue = "";
        display.textContent = displayPrevValue;
        indicator = false;
      }
      if (
        currentOperator === "-" &&
        display.textContent.length < 1 &&
        !prevValue
      ) {
        display.textContent = currentOperator + e.target.value;
      } else {
        display.textContent += e.target.value;
      }

      if (e.target.value === ".") {
        point.setAttribute("disabled", "");
      }
    }
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    if (e.target.value === "-" && display.textContent.length < 1) {
      display.textContent = e.target.value;
    }
    if (
      currentOperator === e.target.value &&
      !indicator &&
      result &&
      prevValue &&
      isNaN(prevValue) === false &&
      display.textContent
    ) {
      result = operate(currentOperator, +prevValue, +display.textContent);
      indicator = true;
      display.textContent = parseFloat(result.toFixed(10));
      displayPrevValue = true;
      currentOperator = "";
      point.removeAttribute("disabled", "");

      if (isNaN(result)) {
        clear();
      }

      if (result === Infinity || result === -Infinity) {
        display.textContent =
          Math.random() > 0.5
            ? "The wasteland has claimed your life."
            : "The Matrix has you...";
      }
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

    if (isNaN(result)) {
      clear();
    }

    if (result === Infinity || result === -Infinity) {
      display.textContent =
        Math.random() > 0.5
          ? "The wasteland has claimed your life."
          : "The Matrix has you...";
    }

    document
      .querySelector(".current-operator")
      .classList.remove("current-operator");
  }
});

clearBtn.addEventListener("click", clear);

function clear() {
  currentOperator = "";
  prevValue = "";
  displayPrevValue = "";
  display.textContent = "";
  result = true;
  indicator = false;
  point.removeAttribute("disabled", "");

  document
    .querySelector(".current-operator")
    .classList.remove("current-operator");
}

const highlightSound = document.querySelector("#highlight");
const selectSound = document.querySelector("#select");
const lightOnSound = document.querySelector("#light");
function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
highlightSound.muted = true;
selectSound.muted = true;
lightOnSound.muted = true;

soundSwitchCheckbox.addEventListener("click", () => {
  if (soundSwitchCheckbox.checked === true) {
    highlightSound.muted = false;
    selectSound.muted = false;
    lightOnSound.muted = false;
  } else {
    highlightSound.muted = true;
    selectSound.muted = true;
    lightOnSound.muted = true;
  }
});

allButtons.forEach((button) => {
  button.addEventListener("mouseover", () => playSound(highlightSound));
  button.addEventListener("click", () => playSound(selectSound));
});

colorSwitchCheckbox.addEventListener("click", () => {
  playSound(lightOnSound);
});

colorSwitchCheckbox.addEventListener("click", () => {
  if (colorSwitchCheckbox.checked === true) {
    root.style.setProperty("--bg-color", "rgb(74 63 37)");
    root.style.setProperty("--main-color", "rgb(42, 33, 13)");
    root.style.setProperty("--font-color", "rgb(219, 174, 62)");
    changeColor("rgb(219, 174, 62)");
  } else {
    root.style.setProperty("--bg-color", "rgb(61, 85, 65)");
    root.style.setProperty("--main-color", "rgb(3, 27, 14)");
    root.style.setProperty("--font-color", "rgb(32, 192, 104)");
    changeColor("rgb(32, 192, 104)");
  }
});

function changeColor(color) {
  const svg = document.querySelector("#vault-boy").contentDocument;
  const svgElements = svg.querySelectorAll(".st0");
  svgElements.forEach((elem) => {
    elem.style.fill = color;
  });
}
