import calcScroll from "./calcScroll.js";

const form = document.querySelector("#contacts__form");
// const button = form.querySelector("#contacts__btn");
const messageSent = document.querySelector(
  ".contacts__message"
);
const overflow = document.body;
const scrolling = calcScroll();
const messageTitle = document.querySelector(
  ".contact__message-title"
);
const closeMessageSent = document.querySelector(
  ".contacts__message-close"
);

const inputArr = form.querySelectorAll("input");
const validInputArr = [];

inputArr.forEach((input) => {
  if (input.hasAttribute("data-reg")) {
    input.setAttribute("is-valid", "0");
    validInputArr.push(input);
  }
});

form.addEventListener("input", inputHandler);

form.addEventListener("submit", formCheck);

function inputHandler({ target }) {
  // проверяем поле input с необходимым атрибутом
  if (target.hasAttribute("data-reg")) {
    inputCheck(target);
  }
}

function inputCheck(elem) {
  const inputValue = elem.value;
  const inputReg = elem.getAttribute("data-reg");
  const reg = new RegExp(inputReg);

  const label = elem.nextElementSibling;
  const span = label.nextElementSibling;

  if (reg.test(inputValue)) {
    elem.setAttribute("is-valid", "1");
    span.innerHTML = "";
  } else {
    span.innerHTML = "Поле заполнено не верно";
    elem.setAttribute("is-valid", "0");
    if (inputValue === "") {
      span.innerHTML = "";
    }
  }
}

function formCheck(e) {
  e.preventDefault();

  const isAllValid = [];

  validInputArr.forEach((input) => {
    isAllValid.push(input.getAttribute("is-valid"));
  });

  const isValid = isAllValid.reduce((acc, current) => {
    return acc * current;
  });
  console.log(isValid);

  if (Boolean(Number(isValid))) {
    formSubmit();
    return;
  }
}

async function formSubmit() {
  let data = formData(form);
  console.log(data);

  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log("Отправлено");
        formReset();
        showMessage("Данные отправлены!");
      }
    }
  };

  // xhr.open("POST", "mail.php", true);
  xhr.open("POST", "send_mail.php", true);
  xhr.send(data);
}

function formData(form) {
  return new FormData(form);
}

function formReset() {
  form.reset();
}

// function showMessage(message) {
function showMessage() {
  messageSent.style.display = "flex";
  overflow.style.overflow = "hidden";
  overflow.style.paddingRight = `${scrolling}px`;
  // messageTitle.innerHTML = message;
}

closeMessageSent.addEventListener("click", closeMessage);

function closeMessage() {
  messageSent.style.display = "none";
  overflow.style.overflow = "";
  overflow.style.paddingRight = `0px`;
}
