var btnEl = document.querySelector("#searchBtn");
var cityEl = document.querySelector("#city-search");

btnEl.addEventListener("click", function(event) {
    event.preventDefault();

    console.log(cityEl.value);
});