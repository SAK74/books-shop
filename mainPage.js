async function fetchData() {
  try {
    const resp = await fetch("./books.json");
    return await resp.json();
  } catch (err) {
    console.error(err);
  }
}

function showMore({ lastChild: block }) {
  console.log(block);

  block.style.visibility = "visible";
}
function handleClose({ parentNode }, ev) {
  ev.stopPropagation();
  console.log(parentNode, ev);
  parentNode.style.visibility = "hidden";
}

function start() {
  fetchData().then((data) => {
    // console.log(data);
    const books = data.map((book) => {
      const img = document.createElement("img");
      img.src = book.imageLink;
      img.width = "300";
      img.height = "400";
      const author = document.createElement("p");
      author.innerText = book.author;
      const title = document.createElement("h3");
      title.innerText = book.title;
      const price = document.createElement("p");
      price.innerText = `Price: ${book.price}`;

      const nodes = [author, title, price];
      const content = document.createElement("span");
      for (const node of nodes) {
        content.appendChild(node);
      }
      content.classList.add("book-content");
      // const control = document.createElement("div");
      const more = document.createElement("span");
      more.innerText = "Show more";
      const descr = document.createElement("div");
      descr.appendChild(author);
      descr.appendChild(document.createTextNode(book.description));
      descr_btn = document.createElement("button");
      descr_btn.innerText = "Close";
      descr_btn.addEventListener("click", function (ev) {
        handleClose(this, ev);
      });
      descr.appendChild(descr_btn);
      more.appendChild(descr);
      const btn = document.createElement("button");
      btn.innerText = "Add to bag";
      content.appendChild(more);
      content.appendChild(btn);
      more.addEventListener("click", function () {
        showMore(this);
      });

      const wrapper = document.createElement("div");
      wrapper.className = "book-wrapper";
      wrapper.appendChild(img);
      wrapper.appendChild(content);
      return wrapper;
    });
    // console.log(books);
    const catalog = document.getElementById("catalog");
    for (const book of books) {
      catalog.appendChild(book);
    }
    catalog.className = "catalog";
  });
}
