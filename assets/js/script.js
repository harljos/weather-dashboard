var searchBtnEl = document.querySelector("#searchBtn");
var cityEl = document.querySelector("#city-search");
var weatherCard = document.querySelector("#weather-card");
var forecastCard1 = document.querySelector("#forecast1");
var forecastCard2 = document.querySelector("#forecast2");
var forecastCard3 = document.querySelector("#forecast3");
var forecastCard4 = document.querySelector("#forecast4");
var forecastCard5 = document.querySelector("#forecast5");
var weatherBtns = document.querySelector("#weatherBtn");
var apiKey = "72a59ebfae3893a4cb8b37a32f9526af";
var cities = [];

// gets the lat and lon to locate a city
function getCity(city) {
    if (city === "") {
        console.log("hi");
        return false;
    }
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

// sorts through the api to get the current weather
function getCurrentWeather(lat, lon) {
    console.log(lat, lon);
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayCurrentWeather(data);
        });
}

// sorts through the api to get the weather for the next five days
function get5DayForecast(lat, lon) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            display5DayForecast(data);
            console.log(data);
        })
}

// displays a button of the city that the user entered and stores the cities in local storage
function displayWeatherBtns(city) {
    var btn = document.createElement("btn");
    btn.textContent = city;
    btn.setAttribute("class", "btn btn-primary mb-5 me-3");
    btn.setAttribute("id", city);
    cities.push(city);
    console.log(cities);
    weatherBtns.append(btn);

    localStorage.setItem("cities", JSON.stringify(cities));
}

// puts the buttons from the cities stored in local storage
function displayStoredBtns() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));
    cities = storedCities;
    if (cities != null) {
        for (var i = 0; i < cities.length; i++) {
            var btn = document.createElement("btn");
            btn.textContent = cities[i];
            btn.setAttribute("class", "btn btn-primary mb-5 me-3");
            btn.setAttribute("id", cities[i]);
            weatherBtns.append(btn);
        }
    }
    else {
        cities = [];
    }
    
}

// clears text of cards
function clearText() {
    weatherCard.innerHTML = "";
    forecastCard1.innerHTML = "";
    forecastCard2.innerHTML = "";
    forecastCard3.innerHTML = "";
    forecastCard4.innerHTML = "";
    forecastCard5.innerHTML = "";
}

// displays the current weather on the main card
function displayCurrentWeather(data) {
    console.log(data.weather[0].main);
    var status = data.weather[0].main;
    var temp = data.main.temp;
    var wind = data.wind.speed;
    var humidity = data.main.humidity;
    if (status === "Clouds") {
        var statusIcon = "☁";
    }
    else if (status === "Clear") {
        var statusIcon = "☀";
    }
    else if (status === "Rain") {
        var statusIcon = "🌧";
    }
    else if (status === "Snow") {
        var statusIcon = "🌨";
    }
    var h5 = document.createElement("h5");
    var p = document.createElement("p");
    var p2 = document.createElement("p");
    var p3 = document.createElement("p");
    h5.innerHTML = data.name + " " + dayjs().format("MM-D-YYYY") + statusIcon;
    p.innerHTML = "Temp: " + temp + "°F";
    p2.innerHTML = "Wind Speed: " + wind + " MPH";
    p3.innerHTML = "Humidity: " + humidity + " %";
    weatherCard.append(h5);
    weatherCard.append(p);
    weatherCard.append(p2);
    weatherCard.append(p3);
}

// displays the weather of the next five days on small cards
function display5DayForecast(data) {
    var count = 0;
    for (var i = 0; i < data.list.length; i += 8) {
        var status = data.list[i].weather[0].main;
        if (status === "Clouds") {
            var statusIcon = "☁";
        }
        else if (status === "Clear") {
            var statusIcon = "☀";
        }
        else if (status === "Rain") {
            var statusIcon = "🌧";
        }
        else if (status === "Snow") {
            var statusIcon = "🌨";
        }
        var h5 = document.createElement("h5");
        var p = document.createElement("p");
        var p2 = document.createElement("p");
        var p3 = document.createElement("p");
        h5.innerHTML = data.city.name + " " + dayjs().add(count + 1, "d").format("MM-D-YYYY") + statusIcon;
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

// to display the buttons when the page has realoaded
displayStoredBtns();

// when the user clicks on the button it will store the city and display the forecast
searchBtnEl.addEventListener("click", function(event) {
    event.preventDefault();
    clearText();
    cityEl.innerHTML = "";
    var empty = getCity(cityEl.value);
    if (!empty) {
        displayWeatherBtns(cityEl.value);  
    }   
});

// when the user clicks on a button in the weatherBtn div it will display the forecast for the given city
weatherBtns.addEventListener("click", function(event) {
    city =  event.target.getAttribute("id");
    clearText();
    getCity(city);
});

