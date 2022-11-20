function lessThan(val, sym) {
  return val.length < sym;
}
function onlyString(val) {
  return /\D/g.test(val);
}
function withoutSpaces(val) {
  return /\S/g.test(val);
}

const errorText = document.createElement("span");
errorText.innerText = "The field is invalid!";
errorText.className = "error";

function checkComplete() {
  const fields = document.querySelectorAll(
    "input:not([type=radio], [type=checkbox])"
  );
  const nodeArr = Array.from(fields.values());
  const complete = nodeArr.every((elem) => elem.dataset.valid === "true");
  document.querySelector("[type=submit]").disabled = !complete;
}

function validation() {
  const name = this.name;
  const input = document.querySelector("form").elements.namedItem(name);
  const value = input.value;
  let isInvalid;
  switch (name) {
    case "name":
      isInvalid =
        !value ||
        lessThan(value, 4) ||
        !onlyString(value) ||
        !withoutSpaces(value);
      break;
    case "surname":
      isInvalid =
        !value ||
        lessThan(value, 5) ||
        !onlyString(value) ||
        !withoutSpaces(value);
      break;
    case "delivery":
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      isInvalid =
        !value ||
        Math.ceil((new Date(value) - tomorrow) / 1000 / 3600 / 24) < 0;
      break;
    case "street":
      isInvalid = !name || lessThan(value, 5);
      break;
    case "house":
      isInvalid = !value || value <= 0;
      break;
    case "flat":
      isInvalid = !/^[0-9]+$|\-/g.test(value) || /^\-/g.test(value);
      break;
  }
  if (isInvalid) {
    input.classList.add("error");
  } else {
    input.classList.remove("error");
    input.dataset.valid = "true";
  }
  input.nextElementSibling.style.visibility = isInvalid ? "visible" : "hidden";
  checkComplete();
}
const checkedGifts = [];
function handleGifts(list, { target }) {
  checkedGifts.push(target.id);
  if (checkedGifts.length > 2) {
    checkedGifts.shift();
  }
  for (const gift of list) {
    gift.checked = checkedGifts.includes(gift.id);
  }
}

function start() {
  const storage = sessionStorage.getItem("total_amount");
  if (storage) {
    document
      .getElementById("total")
      .appendChild(document.createTextNode(storage));
  }
  document
    .querySelectorAll("input:not([type=radio], [type=checkbox])")
    .forEach((input) => {
      input.addEventListener("blur", validation);
      input.parentNode.appendChild(errorText.cloneNode(true));
    });
  document
    .getElementById("gifts")
    .querySelectorAll("input")
    .forEach((gift, i, list) => {
      gift.id = `gift${i}`;
      gift.addEventListener("change", function (ev) {
        handleGifts(list, ev);
      });
    });
}

function handleSubmit(form, ev) {
  ev.preventDefault();
  const elements = form.elements;
  const elemValue = (name) => form.elements.namedItem(name).value;
  const info = document.getElementById("info");
  const content = document.createElement("div");
  content.appendChild(
    document.createTextNode(
      `The order created. \n\n The delivery address is ${elemValue(
        "street"
      )} street, house ${elemValue("house")}, flat ${elemValue(
        "flat"
      )}.\nCustomer ${elemValue("name")} ${elemValue("surname")}.`
    )
  );
  info.insertBefore(content, info.querySelector("div"));
  info.style.transform = "scale(1)";
}

function handleBack() {
  const info = document.getElementById("info");
  info.style.transform = "scale(0)";
  info.firstElementChild.remove();
}
function handleConfirm() {
  const data = document.querySelector("form").elements;
  // do something
  location.assign(".");
}
