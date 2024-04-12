const BASE_URL = "http://localhost:3000/Feeling";

document.addEventListener("DOMContentLoaded", () => {
  fetchFeelings();
});

function fetchFeelings() {
  fetch(`${BASE_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json().then((Feelings) => console.log(Feelings)));
}
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchResults = document.getElementById("searchResults");
searchButton.addEventListener("click", () => {
  const searchQuery = searchInput.value.toLowerCase();
  fetch(`${BASE_URL}`)
    .then((response) => response.json())
    .then((data) => {
      const results = data.Feeling.filter((item) =>
        item.id.toLowerCase().includes(searchQuery)
      );
      displayResults(results);
    });
});

function displayResults(results) {
  searchResults.innerHTML = "";
  results.forEach((result) => {
    const resultDiv = document.createElement("div");
    resultDiv.innerHTML = `
                    <h3>${result.id}</h3>
                    <p>${result.Quote}</p>
                    <img src="${result.link}" alt="${result.id}">
                `;
    searchResults.appendChild(resultDiv);
  });
}
const showFeelingButton = document.getElementById("showfeeling");

showFeelingButton.addEventListener("click", () => {
  fetch("db.json")
    .then((response) => response.json())
    .then((data) => {
      const firstLink = data.Feeling[0].link;
      window.open(firstLink, "_blank");
    })
    .catch((error) => console.error("Error:", error));
});
