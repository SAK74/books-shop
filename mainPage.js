async function start() {
  const books = (await fetchData()).map((book, id) => {
    const img = document.createElement('img');
    img.src = book.imageLink;
    img.className = 'image';
    img.draggable = false;
    const author = document.createElement('p');
    author.innerText = book.author;
    const title = document.createElement('h3');
    title.innerText = book.title;
    const price = document.createElement('p');
    price.innerText = `Price: $${book.price}`;
    price.className = 'price';

    const nodes = [author, title, price];
    const content = document.createElement('span');
    for (const node of nodes) {
      content.appendChild(node);
    }
    content.classList.add('book-content');

    const more = document.createElement('span');
    more.innerText = 'Show more';
    more.className = 'more';
    const descr = document.createElement('div');
    descr.appendChild(title.cloneNode(true));
    descr.appendChild(document.createTextNode(book.description));
    descr_btn = document.createElement('button');
    descr_btn.innerText = 'Close';
    descr_btn.addEventListener('click', handleClose);
    descr.appendChild(descr_btn);
    more.appendChild(descr);

    const btn = document.createElement('button');
    btn.innerText = 'Add to bag';
    btn.addEventListener('click', handleAdd);
    btn.classList.add('button');
    more.addEventListener('click', showMore);

    const control = document.createElement('div');
    control.appendChild(more);
    control.appendChild(btn);
    control.classList.add('control');
    content.appendChild(control);

    const wrapper = document.createElement('div');
    wrapper.className = 'book-wrapper';
    wrapper.appendChild(img);
    wrapper.appendChild(content);
    wrapper.addEventListener('dragstart', () => {});
    wrapper.id = id;
    wrapper.draggable = true;
    wrapper.addEventListener('dragstart', handleDragStart);
    wrapper.addEventListener('dragend', handleDragEnd);
    return wrapper;
  });

  const catalog = document.createElement('section');
  for (const book of books) {
    catalog.appendChild(book);
  }
  catalog.className = 'catalog';

  const bagContainer = document.createElement('div');
  bagContainer.id = 'bag';
  bagContainer.addEventListener('dragover', handleDragOver);
  bagContainer.addEventListener('drop', handleDrop);

  const totalAmount = document.createElement('span');
  const bag = bagContainer.getElementsByClassName('book-wrapper');

  totalAmount.innerText = '0';
  totalAmount.id = 'total';
  const controlLine = document.createElement('div');
  controlLine.appendChild(totalAmount);
  const sbmtBtn = document.createElement('button');
  sbmtBtn.innerText = 'confirm';
  sbmtBtn.addEventListener('click', handleSubmit);
  sbmtBtn.classList.add('button');
  controlLine.appendChild(sbmtBtn);
  controlLine.className = 'control';
  bagContainer.appendChild(controlLine);
  const empty = document.createElement('div');
  empty.innerHTML = 'The bag is empty...';
  empty.className = 'empty';
  bagContainer.appendChild(empty);

  const bagIcon = document.createElement('div');
  bagIcon.className = 'top-icons';
  const cart = document.createElement('i');
  cart.className = 'fa-regular fa-cart-shopping cart';
  cart.addEventListener('dragover', handleDragOver);
  cart.addEventListener('drop', handleDrop);
  cart.addEventListener('animationend', () => {
    cart.classList.remove('animation');
  });
  cart.addEventListener('click', showBag);
  const arrow = document.createElement('i');
  arrow.addEventListener('click', showBag);
  arrow.className = 'fa-solid fa-angle-down arrow';
  bagIcon.appendChild(cart);
  bagIcon.appendChild(arrow);

  const section2 = document.createElement('section');
  section2.appendChild(bagIcon);
  section2.appendChild(bagContainer);
  const main = document.createElement('main');
  main.appendChild(catalog);
  main.appendChild(section2);
  document.getElementById('root').appendChild(main);
}
