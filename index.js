const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

function getCurrentDate() {
    let now = new Date();
    let dayOfWeek = daysOfWeek[now.getDay()];
    let hours = now.getHours();
    let minutes = now.getMinutes();

    let formattedDate = `${dayOfWeek}, ${hours}:${minutes}`;
    return formattedDate;
}

let dateElement = document.querySelector(".date");
dateElement.innerHTML = getCurrentDate();

//challenge 2  display the input of the input
function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    let h2 = document.querySelector(".display-text");
    let cityName = searchInput.value;

    // Make API call to OpenWeather to retrieve temperature for searched city
    let apiKey = "bf54175800a55e59e6c4d6461deeef12";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    axios
        .get(apiUrl)
        .then((response) => {
            let temperature = response.data.main.temp;
            let temperatureElement = document.querySelector("#temperature");
            temperatureElement.innerHTML = `${temperature}°C`;
        })
        .catch((error) => {
            console.log(error);
        });

    h2.innerHTML = cityName;
}

let form = document.querySelector("#search-btn");
form.addEventListener("click", search);

//challenge 3
function getWeatherData(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let apiKey = "bf54175800a55e59e6c4d6461deeef12";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
    let cityName = response.data.name;
    let temp = Math.round(response.data.main.temp);
    let tempElement = document.querySelector("#temperature");
    let cityElement = document.querySelector(".city");
    tempElement.innerHTML = temp;
    cityElement.innerHTML = cityName;
}

function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(getWeatherData, handleError);
}

function handleError(error) {
    console.log(error);
}

let button = document.querySelector("#search-btn");
button.addEventListener("click", getCurrentLocation);

//Add a Current Location button. When clicking on it,
//it uses the Geolocation API to get your GPS coordinates
//and display and the city and current temperature using the OpenWeather API.
function searchCity(city) {
    let apiKey = "bf54175800a55e59e6c4d6461deeef12";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
    let temperatureElementOne = document.querySelector("#temperature");
    temperatureElementOne.innerHTML = `${Math.round(response.data.main.temp)}°C`;

    let cityElementOne = document.querySelector(".city");
    cityElementOne.innerHTML = response.data.name;
}

function getCurrentLocationData(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let apiKey = "bf54175800a55e59e6c4d6461deeef12";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(displayTemperature);
    });
}

let currentLocationButton = document.querySelector("#current-btn");
currentLocationButton.addEventListener("click", getCurrentLocationData);

// searchCity("Lagos");
