const accessKey = "aEfn8IKe4XkMecE4Sir8r2Y20cv6_mlvfoDHH2RCacs";

const formEl = document.getElementById("search-form");
const inputEl = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const showMoreBtn = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputEl.value.trim();

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  data.results.forEach(result => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description || inputData;

    const link = document.createElement("a");
    link.href = result.links.html;
    link.target = "_blank";
    link.textContent = result.alt_description || "View Image";

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(link);
    searchResults.appendChild(imageWrapper);
  });

  page++;
  if (data.results.length > 0) {
    showMoreBtn.style.display = "block";
  } else {
    showMoreBtn.style.display = "none";
  }
}

formEl.addEventListener("submit", event => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  searchImages();
});
