let now = new Date();
let h4 = document.querySelector("h4");

let days = [
  "Sunday",
  "Monday",
  "Thursday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let date = now.getDate();
if (date < 10) {
  date = "0" + date;
}
let month = now.getMonth();
month = Math.round(1 + month);
if (month < 10) {
  month = "0" + month;
}
let year = now.getFullYear();

let hours = now.getHours();
if (hours < 10) {
  hours = "0" + hours;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

h4.innerHTML =
  day +
  "<br />" +
  date +
  "." +
  month +
  "." +
  year +
  "<br />" +
  hours +
  ":" +
  minutes;

//

function showTemperature(response) {
  console.log(response.data);
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;

  let tempC = response.data.main.temp;
  let tempMain = document.querySelector(".tempMain");
  tempMain.innerHTML = Math.round(tempC);

  let humidOne = document.querySelector(".humidOne");
  humidOne.innerHTML = response.data.main.humidity;

  let windOne = document.querySelector(".windOne");
  windOne.innerHTML = Math.round(response.data.wind.speed);

  let descriptionOne = document.querySelector("#clear");
  descriptionOne.innerHTML = response.data.weather[0].description;
}

function search(city) {
  let apiKey = `99da04848d12f6363764ab7d54adc040`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-one").value;
  search(city);
}
let formSearch = document.querySelector(".search-form");
formSearch.addEventListener("submit", handleSubmit);

//
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = `${currentCity.value}`;
}
let buttonCurrentPosition = document.querySelector("#current-location-button");
buttonCurrentPosition.addEventListener("click", getCurrentPosition);

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "99da04848d12f6363764ab7d54adc040";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(`${url}&appid=${apiKey}`).then(showTemperature);
}

//

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".tempMain");
  let tempF = (tempC * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(tempF);
  celsium.classList.remove("active");
  fahrenheit.classList.add("active");
}
function displayCelsiumTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".tempMain");
  temperatureElement.innerHTML = Math.round(tempC);
  celsium.classList.add("active");
  fahrenheit.classList.remove("active");
}

let tempC = null;

let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemperature);

let celsium = document.querySelector(".celsium");
celsium.addEventListener("click", displayCelsiumTemperature);
