import * as colors from "./colors.js";

let elementsCount = 50;
let timeout = 0;
let sortStatus = 0;
let userNumbers;
export function changeTimeout(newValue) {
  timeout = newValue;
}
function getRectangle(width, height) {
  let rect = document.createElement("div");
  rect.style.width = width + "rem";
  rect.style.height = height + "px";
  rect.style.background = colors.DEFAULT_COLOR;
  rect.classList.add("rectangle");
  return rect;
}

export function swapRectangles(a, b) {
  let temp = a.style.height;
  a.style.height = b.style.height;
  b.style.height = temp;
}

export function changeRectangleValue(oldRectangle, newRectangle) {
  oldRectangle.style.height = newRectangle.style.height;
}

export function paintRectangle(a, color) {
  a.style.background = color;
}

export function paintRectangles(a, b, color) {
  a.style.background = color;
  b.style.background = color;
}

export function initMainWindow() {
  let window = document.getElementById("mainWindow");
  window.innerHTML = "";
  let windowWidth = window.offsetWidth / elementsCount;
  let windowHeigth = (window.offsetHeight - 6) / elementsCount;
  for (let i = 1; i <= elementsCount; i++) {
    window.appendChild(getRectangle(windowWidth, windowHeigth * i));
  }
}

export async function shaffleRectangles() {
  let window = document.getElementById("mainWindow");
  let rectangles = window.querySelectorAll(".rectangle");

  for (let i = 0; i < rectangles.length; i++) {
    var j = Math.floor(Math.random() * rectangles.length);
    swapRectangles(rectangles[i], rectangles[j]);
  }
}

export function delay() {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

function clearWindow() {
  let window = document.getElementById("mainWindow");
  let rectangles = window.querySelectorAll(".rectangle");
  for (let i = 0; i < rectangles.length; i++) {
    window.removeChild(rectangles[i]);
  }
  sortStatus = 0;
}

export async function resizeWindow() {
  let strUserNumbers = document.getElementById("usernumbersInput");
  strUserNumbers.value = "";
  userNumbers = null;
  let newCount = document.getElementById("sizeInput").value;
  document.getElementById("elementsCount").textContent = newCount;
  elementsCount = newCount;
  clearWindow();
  initMainWindow();
  document.getElementById("shaffleBtn").disabled = false;
}

async function changeSortSpeed() {
  let newCount = document.getElementById("speedInput").value;
  timeout = 1500 - newCount;
}

export function getRectangles() {
  let window = document.getElementById("mainWindow");
  return window.querySelectorAll(".rectangle");
}

export function getHeightAsNumber(element) {
  return parseInt(element.style.height.replace("px", ""));
}

export async function processRectanglePair(a, b) {
  if (getHeightAsNumber(a) > getHeightAsNumber(b)) {
    paintRectangles(a, b, colors.BAD_COLOR);
    await delay();
    swapRectangles(a, b);
    paintRectangles(a, b, colors.DEFAULT_COLOR);
  } else {
    paintRectangles(a, b, colors.GOOD_COLOR);
    await delay();
    paintRectangles(a, b, colors.DEFAULT_COLOR);
  }
}

function sortUserRectangles() {
  let window = document.getElementById("mainWindow");
  window.innerHTML = "";
  let windowWidth = window.offsetWidth / userNumbers.length;
  let max = Math.max(...userNumbers);
  let windowHeigth = (window.offsetHeight - 6) / max;
  let rectangles = [];
  for (let i = 0; i < userNumbers.length; i++) {
    rectangles.push(
      getRectangle(windowWidth, windowHeigth * userNumbers[i] - 1)
    );
  }
  rectangles.sort(function (a, b) {
    if (getHeightAsNumber(a) < getHeightAsNumber(b)) {
      return -1;
    }
    if (getHeightAsNumber(a) > getHeightAsNumber(b)) {
      return 1;
    }
    return 0;
  });
  rectangles.forEach((x) => {
    window.appendChild(x);
  });
}
export async function Sort(sortFunction) {
  if (sortStatus) {
    sortStatus++;
    if (userNumbers) {
      sortUserRectangles();
    } else {
      initMainWindow();
    }
    return;
  }
  sortStatus++;
  document.getElementById("shaffleBtn").disabled = true;
  await sortFunction();
  sortStatus = 0;
  document.getElementById("shaffleBtn").disabled = false;
}

export function getSortStatus() {
  return sortStatus;
}

export function initMainWindowUserNumbers() {
  let window = document.getElementById("mainWindow");
  window.innerHTML = "";

  // Определяем ширину прямоугольника
  let windowWidth = window.offsetWidth / userNumbers.length;

  // Найдем минимальное и максимальное значения
  let max = Math.max(...userNumbers);
  let min = Math.min(...userNumbers);

  // Избегаем логарифма от нуля или отрицательных значений, используя минимальное положительное значение 1
  let logMax = Math.log10(max > 1 ? max : 1);
  let logMin = Math.log10(min > 1 ? min : 1);

  // Высота окна
  let windowHeigth = window.offsetHeight - 6;

  // Устанавливаем минимальную высоту для элементов, чтобы они были видимы
  const MIN_HEIGHT = 5; // Пикселей

  let rectangles = [];
  for (let i = 0; i < userNumbers.length; i++) {
    // Логарифмическое значение
    let logValue = Math.log10(userNumbers[i] > 1 ? userNumbers[i] : 1); // Заменяем значения <= 1 на 1 для логарифма

    // Нормализация логарифмического значения к диапазону [0, 1]
    let normalizedLogValue = (logValue - logMin) / (logMax - logMin);

    // Масштабирование нормализованного логарифмического значения к высоте окна
    let scaledHeight = normalizedLogValue * windowHeigth;

    // Добавляем минимальную высоту для видимости
    scaledHeight = Math.max(scaledHeight, MIN_HEIGHT);

    // Создание и добавление прямоугольника с нормализованной высотой
    let rect = getRectangle(windowWidth, scaledHeight - 1);

    // Настраиваем цвет в зависимости от высоты для лучшего восприятия
    rect.style.backgroundColor = `rgba(0, 0, 255, ${
      0.5 + 0.5 * normalizedLogValue
    })`;

    window.appendChild(rect);
  }
}

let shaffleBtn = document.getElementById("shaffleBtn");
shaffleBtn?.addEventListener("click", () => {
  shaffleRectangles();
});

shaffleBtn?.addEventListener("mouseover", () => {
  let imgElement = shaffleBtn.querySelector("svg");
  imgElement.style.fill = "#000000";
});

shaffleBtn?.addEventListener("mouseout", () => {
  let imgElement = shaffleBtn.querySelector("svg");
  imgElement.style.fill = "#FFFFFF";
});

let speedInput = document.getElementById("speedInput");
speedInput?.addEventListener("click", () => {
  changeSortSpeed();
});

let resizeBtn = document.getElementById("sizeInput");
resizeBtn?.addEventListener("change", () => {
  resizeWindow();
});

function printValidation() {
  let form = document.getElementById("usernumbersInput");
  form.classList.add("is-invalid");
}

function clearValidation() {
  let form = document.getElementById("usernumbersInput");
  form.classList.remove("is-invalid");
}

function isStrNumbersValid(strNumbers) {
  let result = true;
  strNumbers = strNumbers.trim();
  if (strNumbers.length == 0) {
    retult = false;
  }
  let numbers = strNumbers.split(" ");
  numbers.forEach((number) => {
    if (isNaN(number)) {
      result = false;
    }
  });
  return result;
}

function parseNumbers(strNumbers) {
  return strNumbers
    .trim()
    .split(" ")
    .map((x) => (x = parseInt(x, 10)));
}

export function processUserInput() {
  let strUserNumbers = document.getElementById("usernumbersInput").value;
  if (!isStrNumbersValid(strUserNumbers)) {
    printValidation();
    return;
  }
  clearValidation();
  userNumbers = parseNumbers(strUserNumbers);
  initMainWindowUserNumbers();
}

let usernumbersBtn = document.getElementById("userNumbersBtn");
usernumbersBtn?.addEventListener("click", () => {
  processUserInput();
});

usernumbersBtn?.addEventListener("mouseover", () => {
  let imgElement = usernumbersBtn.querySelector("svg");
  imgElement.style.fill = "#000000";
});

usernumbersBtn?.addEventListener("mouseout", () => {
  let imgElement = usernumbersBtn.querySelector("svg");
  imgElement.style.fill = "#FFFFFF";
});
initMainWindow();
shaffleRectangles();

var triggerTabList = [].slice.call(document.querySelectorAll("myTab"));
triggerTabList.forEach(function (triggerEl) {
  var tabTrigger = new bootstrap.Tab(triggerEl);

  triggerEl.addEventListener("click", function (event) {
    event.preventDefault();
    tabTrigger.show();
  });
});

let softBtn = document.getElementById("sortBtn");
softBtn?.addEventListener("mouseover", () => {
  let imgElement = softBtn.querySelector("svg");
  imgElement.style.fill = "#000000";
});

softBtn?.addEventListener("mouseout", () => {
  let imgElement = softBtn.querySelector("svg");
  imgElement.style.fill = "#FFFFFF";
});

const mediaphoneQuery = window.matchMedia("(max-width: 1400px)");
let initIcon = `<svg width="20px" viewBox="0 0 24 24" id="create-note" class="icon glyph m-1" style="fill:#ffffff">
                <path d="M20.71,3.29a2.91,2.91,0,0,0-2.2-.84,3.25,3.25,0,0,0-2.17,1L9.46,10.29s0,0,0,0a.62.62,0,0,0-.11.17,1,1,0,0,0-.1.18l0,0L8,14.72A1,1,0,0,0,9,16a.9.9,0,0,0,.28,0l4-1.17,0,0,.18-.1a.62.62,0,0,0,.17-.11l0,0,6.87-6.88a3.25,3.25,0,0,0,1-2.17A2.91,2.91,0,0,0,20.71,3.29Z"/>
                <path d="M20,22H4a2,2,0,0,1-2-2V4A2,2,0,0,1,4,2h8a1,1,0,0,1,0,2H4V20H20V12a1,1,0,0,1,2,0v8A2,2,0,0,1,20,22Z"/>
            </svg>`;

let shaffleIcon = `<svg width="20px" style="fill:#ffffff" viewBox="0 0 32 32" version="1.1">
                <title>random</title>
                <path d="M0 24q0 0.832 0.576 1.44t1.44 0.576h1.984q2.048 0 3.904-0.8t3.168-2.144 2.144-3.2 0.8-3.872q0-2.464 1.728-4.224t4.256-1.76h4v1.984q0 0.672 0.384 1.152t0.864 0.704 1.12 0.128 1.056-0.544l4-4q0.608-0.64 0.576-1.44t-0.576-1.408l-4-4q-0.48-0.448-1.088-0.544t-1.12 0.128-0.864 0.704-0.352 1.12v2.016h-4q-2.016 0-3.872 0.8t-3.2 2.112-2.144 3.2-0.768 3.872q0 2.496-1.76 4.256t-4.256 1.76h-1.984q-0.832 0-1.44 0.576t-0.576 1.408zM0 8.032q0 0.832 0.576 1.408t1.44 0.576h1.984q1.408 0 2.592 0.608t2.080 1.664q0.672-2.048 1.984-3.68-2.912-2.592-6.656-2.592h-1.984q-0.832 0-1.44 0.608t-0.576 1.408zM13.376 23.456q2.848 2.56 6.624 2.56h4v2.016q0 0.64 0.384 1.152t0.864 0.704 1.12 0.096 1.056-0.544l4-4q0.608-0.608 0.576-1.44t-0.576-1.376l-4-4q-0.48-0.48-1.088-0.576t-1.12 0.128-0.864 0.736-0.352 1.12v1.984h-4q-1.376 0-2.592-0.576t-2.048-1.664q-0.704 2.048-1.984 3.68z"/>
            </svg>`;

let sortIcon = `<svg  width="20px" style="fill:#ffffff" viewBox="0 0 24 24">
                <path d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z"/>
            </svg>`;
function blockBtnText(e) {
  if (e.matches) {
    let usernumbersBtn = document.getElementById("userNumbersBtn");
    usernumbersBtn.innerHTML = initIcon;
    let shaffleBtn = document.getElementById("shaffleBtn");
    shaffleBtn.innerHTML = shaffleIcon;
    let sortBtn = document.getElementById("sortBtn");
    sortBtn.innerHTML = sortIcon;
  }
}
mediaphoneQuery.addListener(blockBtnText);
blockBtnText(mediaphoneQuery);

const mediafullQuery = window.matchMedia("(min-width: 1400px)");

function displayBtnText(e) {
  if (e.matches) {
    let usernumbersBtn = document.getElementById("userNumbersBtn");
    usernumbersBtn.innerHTML = initIcon + "Инициализировать";
    let shaffleBtn = document.getElementById("shaffleBtn");
    shaffleBtn.innerHTML = shaffleIcon + ` Размешать`;
    let sortBtn = document.getElementById("sortBtn");
    sortBtn.innerHTML = sortIcon + ` Сортировать`;
  }
}

mediafullQuery.addListener(displayBtnText);
displayBtnText(mediafullQuery);
