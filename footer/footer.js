function addFooter(parent) {
  parent.appendChild(document.createElement("hr"));

  const footer = document.createElement("footer");
  const rsLogo = document.createElement("img");
  rsLogo.src = "./assets/icons/rs_school.svg";
  rsLogo.width = 90;
  rsLogo.height = 60;
  rsLogo.alt = "logo";

  const logoLink = document.createElement("a");
  logoLink.href = "https://rs.school/";
  logoLink.target = "_blank";
  logoLink.rel = "noreferrer";

  logoLink.appendChild(rsLogo);
  footer.appendChild(logoLink);
  footer.appendChild(document.createElement("span"));

  const author = logoLink.cloneNode();
  author.href = "https://github.com/SAK74";
  author.className = "author";
  author.innerHTML = 'by SAK74 <i class="fa-brands fa-github"></i>';

  footer.appendChild(author);

  const copy = document.createElement("span");
  copy.innerText = "© 2022";

  footer.appendChild(copy);
  parent.appendChild(footer);
}
