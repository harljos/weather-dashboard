var searchBtnEl = document.querySelector("#searchBtn");
var cityEl = document.querySelector("#city-search");
var weatherCard = document.querySelector("#weather-card");
var forecastCard1 = document.querySelector("#forecast1");
var forecastCard2 = document.querySelector("#forecast2");
var forecastCard3 = document.querySelector("#forecast3");
var forecastCard4 = document.querySelector("#forecast4");
var forecastCard5 = document.querySelector("#forecast5")
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
            getCurrentWeather(data[0].lat, data[0].lon);
            get5DayForecast(data[0].lat, data[0].lon);
        });
}

function getCurrentWeather(lat, lon) {
    console.log(lat, lon);
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayCurrentWeather(data);
            console.log(data);
            // console.log(data.list[0].weather[0].main);
            // console.log(data.list[0].main.temp);
            // console.log(data.list[0].wind.speed);
            // console.log(data.list[0].dt_txt);
            // console.log(data.list[0].main.humidity);
        });
}

function get5DayForecast(lat, lon) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            display5DayForecast(data);
        })
}

function displayCurrentWeather(data) {
    console.log(data.weather[0].main);
    var h5 = document.createElement("h5");
    var p = document.createElement("p");
    var p2 = document.createElement("p");
    var p3 = document.createElement("p");
    h5.innerHTML = data.dt_txt;
    p.innerHTML = "Temp: " + data.main.temp + "°F";
    p2.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";
    p3.innerHTML = "Humidity: " + data.main.humidity + " %";
    weatherCard.append(h5);
    weatherCard.append(p);
    weatherCard.append(p2);
    weatherCard.append(p3);
}

function display5DayForecast(data) {
    console.log("hello");
    var count = 0;
    for (var i = 0; i < data.list.length; i += 8) {
        var h5 = document.createElement("h5");
        var p = document.createElement("p");
        var p2 = document.createElement("p");
        var p3 = document.createElement("p");
        h5.innerHTML = data.list[i].dt_txt;
        p.innerHTML = "Temp: " + data.list[i].main.temp + "°F";
        p2.innerHTML = "Wind Speed: " + data.list[i].wind.speed + " MPH";
        p3.innerHTML = "Humidity: " + data.list[i].main.humidity + " %";
        if (count === 0) {
            forecastCard1.append(h5);
            forecastCard1.append(p);
            forecastCard1.append(p2);
            forecastCard1.append(p3);
        }
        else if (count === 1) {
            forecastCard2.append(h5);
            forecastCard2.append(p);
            forecastCard2.append(p2);
            forecastCard2.append(p3);
        }
        else if (count === 2) {
            forecastCard3.append(h5);
            forecastCard3.append(p);
            forecastCard3.append(p2);
            forecastCard3.append(p3);
        }
        else if (count === 3) {
            forecastCard4.append(h5);
            forecastCard4.append(p);
            forecastCard4.append(p2);
            forecastCard4.append(p3);
        }
        else {
            forecastCard5.append(h5);
            forecastCard5.append(p);
            forecastCard5.append(p2);
            forecastCard5.append(p3);
        }
        count++;
    }
}