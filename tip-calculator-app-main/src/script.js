// DOM elements and variables
const billInput = document.querySelector(".input-bill");
const tipSelectorsHTMLCollection = document.getElementsByClassName("selector");
const tipSelectors = Array.prototype.slice.call(tipSelectorsHTMLCollection); // Transformed to array
const customSelector = document.querySelector(".custom");
const peopleInput = document.querySelector(".input-people");
const displayAmount = document.querySelector("#value-amount");
const displayTotal = document.querySelector("#value-total");
const resetButton = document.querySelector(".reset");

let billValue;
let percent;
let peopleNumber;
let calculatedTotal;
let calculatedTipAmount;

// Main calculate function - called everytime inputs change (results display if all values are given)
function calculateAll() {
  const resTipAmount = calculateTipAmount(billValue, percent, peopleNumber);
  const resTotal = calculateTotal(billValue, percent, peopleNumber);
  displayAmount.textContent = Number(resTipAmount).toFixed(2);
  displayTotal.textContent = Number(resTotal).toFixed(2);
}

// Functionalities (getting values) and event listeners
function getBillValue() {
  billValue = billInput.value;
  calculateAll();
  return billValue;
}

billInput.addEventListener("input", getBillValue);

function deactivateSelectors() {
  tipSelectors.map((item) => item.classList.remove("activated"));
}

function clickHandlerTipSelectors() {
  percent = this.value;
  deactivateSelectors();
  this.classList.add("activated");
  calculateAll();
  return percent;
}

function addButtonListeners() {
  tipSelectors.map((item) => item.addEventListener("click", clickHandlerTipSelectors));
}

addButtonListeners();

function getCustomValue() {
  let customValue = customSelector.value;
  if (customValue > 0) {
    percent = customValue;
    calculateAll();
    return percent;
  }
}

customSelector.addEventListener("input", getCustomValue);

function getPeopleNumber() {
  let peopleValue = peopleInput.value;
  peopleNumber = peopleValue;
  calculateAll();
  return peopleNumber;
}

peopleInput.addEventListener("input", getPeopleNumber);

function reset() {
  billValue = 0;
  percent = 0;
  peopleNumber = 0;
  billInput.value = "";
  peopleInput.value = "";
  deactivateSelectors();
  calculateAll();
}

resetButton.addEventListener("click", reset);

// Called by the calculate all function:
function calculateTipAmount(billValue, percent, peopleNumber) {
  if (billValue > 0 && percent > 0 && peopleNumber > 0) {
    const tip = billValue * (percent / 100);
    calculatedTipAmount = tip / peopleNumber;
  } else {
    calculatedTipAmount = 0.0;
  }
  return calculatedTipAmount;
}

function calculateTotal(billValue, percent, peopleNumber) {
  if (billValue > 0 && percent > 0 && peopleNumber > 0) {
    const tip = billValue * (percent / 100);
    calculatedTotal = (Number(billValue) + tip) / peopleNumber;
  } else {
    calculatedTotal = 0.0;
  }
  return calculatedTotal;
}
