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
// API
function weather(city) {
  var apiKey = "15afb9017456f61d469f071faff65fed";
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
}

// Get forecast
function displayForecast() {
  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thur"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
              ${day}
              <img src="http://openweathermap.org/img/wn/04n@2x.png" alt="forecast" width="40"><br />
              12° 18°
            </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  document.querySelector("#forecast").innerHTML = forecastHTML;
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
  let apiKey = "15afb9017456f61d469f071faff65fed";
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
