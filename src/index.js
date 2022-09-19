//Date and time
function showDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
// API
function weather(city) {
  var apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemp);
}

weather("sydney");

// Show temperature
function showTemp(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  celsius = response.data.main.temp;
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#descriptor").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#dayTime").innerHTML = showDate(
    response.data.dt * 1000
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  displayForecast();

  getForecast(response.data.coord);
}
// Get forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  document.querySelector("#forecast").innerHTML = forecastHTML;
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
              ${formatDay(forecastDay.dt)}
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="forecast" width="40"><br />
              ${Math.round(forecastDay.temp.min)}° ${Math.round(
          forecastDay.temp.max
        )}
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
}
function getForecast(Coordinates) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//Get city
function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#location").value;
  weather(city);
}

let cityShow = document.querySelector("#cityForm");
cityShow.addEventListener("submit", citySearch);

//Coordinates
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCoords);
}
function getCoords(position) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemp);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getLocation);

//unit conversion
function fahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitElement = document.querySelector("#temperature");
  let fahrenheitConvert = (celsius * 9) / 5 + 32;
  fahrenheitElement.innerHTML = Math.round(fahrenheitConvert);
  document.querySelector("#cls").classList.remove("active");
  document.querySelector("#frn").classList.add("active");
}
document.querySelector("#frn").addEventListener("click", fahrenheitTemp);

function celsiusTemp(event) {
  event.preventDefault();
  document.querySelector("temperature").innerHTML = Math.round(celsius);
  document.querySelector("#cls").classList.add("active");
  document.querySelector("#frn").classList.remove("active");
}
document.querySelector("#cls").addEventListener("click", celsiusTemp);

let celsius = null;
