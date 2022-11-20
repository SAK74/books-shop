function fetchData() {
  return fetch("./books.json")
    .then((resp) => resp.json())
    .then((data) => data)
    .catch((err) => console.error(err));
}

function showMore() {
  this.lastChild.style.visibility = "visible";
}

function handleClose(ev) {
  ev.stopPropagation();
  this.parentNode.style.visibility = "hidden";
}

function handleDragOver(ev) {
  ev.preventDefault();
}
function countTotal() {
  let total = 0;
  const bag = document.getElementById("bag");
  const booksInBag = bag.getElementsByClassName("book-wrapper");
  for (const book of booksInBag) {
    const price = book
      .querySelector(".book-content")
      .querySelector(".price")
      .innerHTML.slice(8);
    const pieces = book.querySelector(".pieces").dataset.pieces;
    total += price * pieces;
  }
  document.getElementById("total").innerText = "Total: $" + total;
  // add animation to shop-cart & show according entry
  const cart = document.querySelector(".cart");
  if (total) {
    bag.querySelector(".control").style.display = "block";
    bag.querySelector(".empty").style.display = "none";
    cart.style.color = "lightcoral";
  } else {
    bag.querySelector(".control").style.display = "none";
    bag.querySelector(".empty").style.display = "block";
    cart.style.color = "initial";
  }
  cart.classList.add("animation");
}
function handleRemove() {
  document.getElementById("bag").removeChild(this.parentElement);
  countTotal();
}
function addToBag(id) {
  const bag = document.getElementById("bag");
  const arr = Array.from(bag.children);
  let pieces;
  if (arr.some((elem) => elem.dataset.id === id)) {
    pieces = bag.querySelector(`[data-id="${id}"]`).querySelector(".pieces");
    pieces.dataset.pieces++;
  } else {
    const book = document.getElementById(id).cloneNode(true);
    book.draggable = false;
    book.removeEventListener("dragstart", handleDragStart);
    const content = book.querySelector(".book-content");
    const control = content.querySelector(".control");
    content.removeChild(control);
    book.removeAttribute("id");
    book.dataset.id = id;
    pieces = document.createElement("div");
    pieces.classList.add("pieces");
    pieces.dataset.pieces = 1;
    pieces.innerText = "Pieces: ";
    content.appendChild(pieces);
    const close = document.createElement("i");
    close.className = "fa-solid fa-circle-xmark";
    close.classList.add("closeX");
    close.addEventListener("click", handleRemove);
    book.appendChild(close);
    bag.insertBefore(book, bag.querySelector(".control"));
  }
  countTotal();
}
function handleDrop(ev) {
  addToBag(ev.dataTransfer.getData("text"));
}

function handleDragStart(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  ev.dataTransfer.effectAllowed = "copy";
  const image = ev.target.querySelector("img").cloneNode();
  image.style.width = "100px";
  image.style.height = "150px";
  image.style.transform = "translateX(-2000px)";
  image.id = "temp";
  document.body.appendChild(image);
  ev.dataTransfer.setDragImage(image, -10, -10);
}
function handleDragEnd() {
  document.body.removeChild(document.getElementById("temp"));
}
function handleAdd() {
  addToBag(this.parentNode.parentNode.parentNode.id);
}
function handleSubmit() {
  sessionStorage.setItem(
    "total_amount",
    document.getElementById("total").innerText.slice(6)
  );
  location.assign("./form");
}
function showBag() {
  const isVisible =
    document.getElementById("bag").style.transform === "scaleY(1)";
  const arrow = document.querySelector(".top-icons").querySelector(".arrow");
  if (isVisible) {
    document.getElementById("bag").style.transform = "scaleY(0)";
    arrow.classList.replace("fa-angle-up", "fa-angle-down");
  } else {
    document.getElementById("bag").style.transform = "scaleY(1)";
    arrow.classList.replace("fa-angle-down", "fa-angle-up");
  }
}
