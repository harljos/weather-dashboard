var searchBtnEl = document.querySelector("#searchBtn");
var cityEl = document.querySelector("#city-search");
var apiKey = "72a59ebfae3893a4cb8b37a32f9526af";


searchBtnEl.addEventListener("click", function(event) {
    event.preventDefault();

    getCity(cityEl.value);    
});


function getCity(city) {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
}

function getWeather(lat, lon) {
    var apiUrl = "api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
}