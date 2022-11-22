function addHeader(parent) {
  const imageWrapper = document.createElement("div");
  imageWrapper.id = "head-image";
  const sourceFoto = document.createElement("a");
  sourceFoto.target = "_blank";
  sourceFoto.rel = "noreferrer";
  sourceFoto.href =
    "https://unsplash.com/ja/@fredmarriage?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText";
  sourceFoto.innerText = "freddie marriage";

  const sourceFoto1 = sourceFoto.cloneNode();
  sourceFoto1.href =
    "https://unsplash.com/s/photos/bookstore?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText";
  sourceFoto1.innerText = "Unsplash";

  imageWrapper.appendChild(document.createTextNode("Photo by\u00A0"));
  imageWrapper.appendChild(sourceFoto);
  imageWrapper.appendChild(document.createTextNode("\u00A0on\u00A0"));
  imageWrapper.appendChild(sourceFoto1);

  const title = document.createElement("h1");
  title.innerText = "Welcome to amazing book shop!";

  const header = document.createElement("header");
  const wrapper = document.createElement("div");
  wrapper.className = "header-wrapper";
  wrapper.appendChild(imageWrapper);
  wrapper.appendChild(title);
  header.appendChild(wrapper);

  const fragment = new DocumentFragment();
  fragment.appendChild(header);
  fragment.appendChild(document.createElement("hr"));
  parent.appendChild(fragment);
}
