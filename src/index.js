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

function showTemp(response) {
  let tempElement = document.querySelector("#temperature");
  let city = document.querySelector(h1);
  let descElement = document.querySelector("#descriptor");
  let humidElement = document.querySelector("#humid");
  let windSpeed = document.querySelector("#wind");
  let dateElement = document.querySelector("#dayTime");
  let iconElement = document.querySelector("#icon");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  descElement.innerHTML = response.data.weather[0].description;
  humidElement.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = showDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function weather(city) {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let apiKey = "15afb9017456f61d469f071faff65fed";
  axios.get(apiURL).then(showTemp);
}

function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#location").value;
  weather(city);
}

let cityShow = document.querySelector("#cityForm");
cityShow.addEventListener("submit", citySearch);
