//@ Themes
const toggleElement = document.querySelector(".themes__toggle");
const themes = ["theme1", "theme2", "theme3"];
let currentThemeIndex = 0;

function cycleTheme() {
  toggleElement.classList.remove(
    `themes__toggle--${themes[currentThemeIndex]}`
  );

  currentThemeIndex++;

  if (currentThemeIndex >= themes.length) {
    currentThemeIndex = 0;
  }

  toggleElement.classList.add(`themes__toggle--${themes[currentThemeIndex]}`);
}

toggleElement.addEventListener("click", cycleTheme);

//@ Calc Logic

let storedNumber = "";
let currentNumber = "";
let operation = "";

const resultElement = document.querySelector(".calc__result");
const keyElements = document.querySelectorAll("[data-type]");

const updateScreen = (value) => {
  resultElement.innerText = !value ? "0" : value;
};

const numberButtonHandler = (value) => {
  if (value === "." && currentNumber.includes(".")) return;
  if (value === "0" && !currentNumber) return;

  currentNumber += value;
  updateScreen(currentNumber);
};

const executeOperation = () => {
  if (currentNumber && storedNumber && operation) {
    switch (operation) {
      case "+":
        storedNumber = (
          parseFloat(storedNumber) + parseFloat(currentNumber)
        ).toString();
        break;
      case "-":
        storedNumber = (
          parseFloat(storedNumber) - parseFloat(currentNumber)
        ).toString();
        break;
      case "*":
        storedNumber = (
          parseFloat(storedNumber) * parseFloat(currentNumber)
        ).toString();
        break;
      case "/":
        storedNumber = (
          parseFloat(storedNumber) / parseFloat((currentNumber))
        ).toString();
        break;
    }
    currentNumber = "";
    updateScreen(storedNumber);
  }
};

const operationButtonHandler = (operationValue) => {
  if (!storedNumber && !currentNumber) return;
  if (currentNumber && !storedNumber) {
    storedNumber = currentNumber;
    currentNumber = "";
    operation = operationValue;
  } else if (storedNumber) {
    operation = operationValue;

    if (currentNumber) executeOperation();
  }
};

const resetButtonHandler = () => {
  storedNumber = "";
  currentNumber = "";
  operation = "";
  updateScreen(currentNumber);
};

const deleteButtonHandler = () => {
  if (currentNumber) {
    if (currentNumber.length === 1) {
      currentNumber = "";
    } else {
      currentNumber = currentNumber.slice(0, -1);
    }
    updateScreen(currentNumber);
  } else if (storedNumber) {
    if (storedNumber.length === 1) {
      storedNumber = "";
    } else {
      storedNumber = storedNumber.slice(0, -1);
    }
    updateScreen(storedNumber);
  }
};

const keyElementsHandler = (element) => {
  element.addEventListener("click", () => {
    const type = element.dataset.type;
    if (type === "number") {
      numberButtonHandler(element.dataset.value);
    } else if (type === "operation") {
      switch (element.dataset.value) {
        case "c":
          resetButtonHandler();
          break;
        case "Backspace":
          deleteButtonHandler();
          break;
        case "Enter":
          executeOperation();
          break;
        default:
          operationButtonHandler(element.dataset.value);
          break;
      }
    }
  });
};

keyElements.forEach(keyElementsHandler);

//@ Use Keyboard as input source
const availableKeys = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "+",
  "-",
  "*",
  "/",
  "Backspace",
  "Enter",
  "c",
];

window.addEventListener("keydown", (event) => {
  keyboardWithHover(event.key);
});

const keyboardWithHover = (key) => {
  if (availableKeys.includes(key)) {
    const elem = document.querySelector(`[data-value="${key}"]`);

    elem.classList.add("hover");
    elem.click();
    setTimeout(() => elem.classList.remove("hover"), 150);
  }
};
