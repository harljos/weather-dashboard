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
            // console.log(data);
            getWeather(data[0].lat, data[0].lon);
        });
}

function getWeather(lat, lon) {
    console.log(lat, lon);
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.list[0].weather[0].description);
            console.log(data.list[0].main.temp);
            console.log(data.list[0].wind.speed);
            console.log(data.list[0].dt_txt);
            console.log(data.list[0].main.humidity);
        });
}