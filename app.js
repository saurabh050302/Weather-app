// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


const weatherApi = {
    key: "dcf3b606f1956c0a7cd715486a8c9b5b",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox = document.getElementById('input-box');


// Event Listner on Keypress

searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.getElementById('search-results').style.display = "block";
    }
})


// Get Weather Report

function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(showWeatherReport);
}


// Show Weather Report

function showWeatherReport(weather) {
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    // let date = document.getElementById('date');
    // date.innerText = `${}`

    let currentTemp = document.getElementById('current-temp');
    currentTemp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max-temp');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C(min) / ${Math.ceil(weather.main.temp_max)}&deg;C(max)`

    let sky = document.getElementById('sky');
    sky.innerText = `${weather.weather[0].main}`

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if (sky.innerText == 'Clear') {
        document.body.style.backgroundImage = "url('images/clear.jpg')"
    } else if (sky.innerText == 'Clouds') {
        document.body.style.backgroundImage = "url('images/cloudy.jpg')"
    } else if (sky.innerText == 'Rain') {
        document.body.style.backgroundImage = "url('images/rainy.jpg')"
    } else if (sky.innerText == 'Snow') {
        document.body.style.backgroundImage = "url('images/snow.jpg')"
    } else if (sky.innerText == 'Thunderstorm') {
        document.body.style.backgroundImage = "url('images/thunder.jpg')"
    } else if (sky.innerText == 'Sunny') {
        document.body.style.backgroundImage = "url('images/sunny.jpg')"
    }
}


// Date Update

function dateManage(dateArg) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}