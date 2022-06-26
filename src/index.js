let now = new Date();
let h2 = document.querySelector("h2");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
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
let day = days[now.getDay()];
h2.innerHTML = `${day} ${hours}:${minutes}`;

function replaceCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `Weather Forecast in ${cityInput.value}`;
}
let form = document.querySelector("#city-search-form");
form.addEventListener("submit", replaceCity);

function changeUnitFah(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
function changeUnitCel(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = 23;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeUnitFah);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeUnitCel);

function showWeather(response) {
  let cityName = response.data.name;
  let temperature = Math.round(response.data.main.temp);

  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = cityName;
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = temperature;
}

function getCityWeather(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  if (cityInput.value) {
    let apiKey = "8b553388ca54138ed825bf23b9eb5c12";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);
  } else {
    alert("Please type a city");
  }
}

function getLocationWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8b553388ca54138ed825bf23b9eb5c12";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getLocationWeather);
}

let cityForm = document.querySelector("#city-search-form");
cityForm.addEventListener("submit", getCityWeather);
