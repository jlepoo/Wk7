let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
let apiKey = "15afb9017456f61d469f071faff65fed";

axios.get(apiURL).then(showTemp);

function showTemp(response) {
    let tempElement = document.querySelector(#temperature);
    let cityName = document.querySelector(h1);
    let descElement = document.querySelector(#descriptor);
    let humidElement = document.querySelector(#humid);
    let windSpeed = document.querySelector(#wind);
    let dateElement = document.querySelector(#dayTime)
    tempElement.innerHTML = Math.round(response.data.main.temp);
    cityName.innerHTML = response.data.name;
    descElement.innerHTML = response.data.weather[0].description;
    humidElement.innerHTML = response.data.main.humidity;
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = function
}