function formatDate(timestamp) {
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

function displayForecast() {
    let forecastElement = document.querySelector("#forecast");

    let days = ["Thu", "Fri", "Sat", "Sun"];

    let forecastHTML = `<div class="row">`;
    days.forEach(function (day) {
        forecastHTML =
            forecastHTML +
            `
      <div class="col-2 card">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    console.log(forecastHTML);
}


function displayTemperature(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector('#temperature');
    let cityElement = document.querySelector('#city');
    let descriptionElement = document.querySelector('#description');
    let humidityElement = document.querySelector('#humidity');
    let windElement = document.querySelector('#wind');
    let dateElement = document.querySelector(".date");
    let iconElement = document.querySelector('#icon');

    displayForecast();

    celsiusTemperature = Math.round(response.data.main.temp)

    temperatureElement.innerHTML = celsiusTemperature;
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}


function search(city) {
    let apiKey = "bf54175800a55e59e6c4d6461deeef12";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector('#search-input');
    search(cityInputElement.value);
}

let form = document.querySelector('#search-btn');
form.addEventListener('click', handleSubmit);

function showFahrenheitTemperature(event) {
    event.preventDefault();
    let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
    let temperatureElement = document.querySelector('#temperature');

    //remove active class from the celsius
    celsiusLink.classList.remove('active');
    fahrenheitLink.classList.add('active');

    temperatureElement.innerHTML = fahrenheitTemperature;
}
function showCelsiusTemperature(event) {
    event.preventDefault();

    celsiusLink.classList.add('active');
    fahrenheitLink.classList.remove('active');
    let temperatureElement = document.querySelector('#temperature');
    temperatureElement.innerHTML = celsiusTemperature;
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector('#fahrenheit-link');
fahrenheitLink.addEventListener('click', showFahrenheitTemperature);

let celsiusLink = document.querySelector('#celsius-link');
celsiusLink.addEventListener('click', showCelsiusTemperature);




//get current location of where the user
function displayCurrentTemperature(response) {
    let temperatureElementOne = document.querySelector("#temperature");
    let cityElementOne = document.querySelector("#city");
    let humidityElement = document.querySelector('#humidity');
    let windElement = document.querySelector('#wind');
    let iconElement = document.querySelector('#icon');
    let dateElement = document.querySelector(".date");


    temperatureElementOne.innerHTML = celsiusTemperature;
    cityElementOne.innerHTML = response.data.name;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

function getCurrentLocationData(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let apiKey = "bf54175800a55e59e6c4d6461deeef12";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(displayCurrentTemperature);
    });
}

let currentLocationButton = document.querySelector("#current-btn");
currentLocationButton.addEventListener("click", getCurrentLocationData);


search('Lagos')







//challenge 2  display the input of the input
// function search(event) {
//     event.preventDefault();
//     let searchInput = document.querySelector("#search-input");
//     let h2 = document.querySelector(".display-text");
//     let cityName = searchInput.value;

//     // Make API call to OpenWeather to retrieve temperature for searched city
//     let apiKey = "bf54175800a55e59e6c4d6461deeef12";
//     let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
//     axios
//         .get(apiUrl)
//         .then((response) => {
//             let temperature = response.data.main.temp;
//             let temperatureElement = document.querySelector("#temperature");
//             temperatureElement.innerHTML = `${temperature}°C`;
//         })
//         .catch((error) => {
//             console.log(error);
//         });

//     h2.innerHTML = cityName;
// }

// let form = document.querySelector("#search-btn");
// form.addEventListener("click", search);

// //challenge 3
// function getWeatherData(position) {
//     let lat = position.coords.latitude;
//     let long = position.coords.longitude;
//     let apiKey = "bf54175800a55e59e6c4d6461deeef12";
//     let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
//     axios.get(apiUrl).then(showTemperature);
// }

// function showTemperature(response) {
//     let cityName = response.data.name;
//     let temp = Math.round(response.data.main.temp);
//     let tempElement = document.querySelector("#temperature");
//     let cityElement = document.querySelector(".city");
//     let descriptionElement = document.querySelector('#description');
//     let iconElement = document.querySelector('#icon')


//     descriptionElement.innerHTML = response.data.weather[0].description;
//     iconElement.setAttribute('src', `http://openweathermap.org/img/wn/04d@2x.png`);
//     tempElement.innerHTML = temp;
//     cityElement.innerHTML = cityName;
// }

// function getCurrentLocation() {
//     navigator.geolocation.getCurrentPosition(getWeatherData, handleError);
// }

// function handleError(error) {
//     console.log(error);
// }

// let button = document.querySelector("#search-btn");
// button.addEventListener("click", getCurrentLocation);

// //Add a Current Location button. When clicking on it,
// //it uses the Geolocation API to get your GPS coordinates
// //and display and the city and current temperature using the OpenWeather API.
// function searchCity(city) {
//     let apiKey = "bf54175800a55e59e6c4d6461deeef12";
//     let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//     axios.get(apiUrl).then(displayTemperature);
// }



// // searchCity("Lagos");
