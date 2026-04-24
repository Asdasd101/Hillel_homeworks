const API_KEY = "4f19e6d9";

const searchInput = document.getElementById("searchInput");
const emptyInfoDiv = document.getElementById("emptyInfo");
const errorDiv = document.getElementById("error");
const loadingDiv = document.getElementById("loading");
const resultContainer = document.getElementById("resultContainer");

searchInput.addEventListener("input", searchTypeHandler);

function searchTypeHandler(event) {
    showHideEmpty(false);
    showHideError(false);
    const value = (event.target.value || "").trim();

    if (!value || value.length < 3) {
        showHideError(true);
        return;
    }


}

function showMovies() {

}

async function searchMovies(query) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
        const data = await response.json();
    }
}

function showHideLoading(isShown) {
    loadingDiv.classList.toggle("hidden", !isShown);
}

function showHideError(isShown) {
    errorDiv.classList.toggle("hidden", !isShown);
}

function showHideEmpty(isShown) {
    emptyInfoDiv.classList.toggle("hidden", !isShown);
}