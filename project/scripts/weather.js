const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');


const lat = -25.7479;
const lon = 28.2293;
const apiKey = 'eae5abe3e1b60f094216be0d6b88db53'; 

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // testing only
            displayResults(data); // uncommented now
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();



const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Forecast fetch failed:", error);
    }

}
function displayForecast(data) {
    const forecastElements = [
        { dayLabel: 'dayplus0', tempLabel: 'day0plusTemp' },
        { dayLabel: 'dayplus1', tempLabel: 'day1plusTemp' },
        { dayLabel: 'dayplus2', tempLabel: 'day2plusTemp' }
    ];

    // Filter for forecasts around 12:00:00 each day
    const middayForecasts = data.list.filter(forecast => forecast.dt_txt.includes("12:00:00"));

    // Loop through the first 3 days
    for (let i = 0; i < 3; i++) {
        const forecast = middayForecasts[i];
        if (forecast) {
            const date = new Date(forecast.dt_txt);
            const dayName = (i === 0) ? "Today" : dayNames[date.getDay()];
            const temp = forecast.main.temp.toFixed(1) + '°C';

            document.getElementById(forecastElements[i].dayLabel).textContent = dayName;
            document.getElementById(forecastElements[i].tempLabel).textContent = temp;
        }
    }
}
function displayResults(data) {
    // Temperature
    document.querySelector('#current-temp').innerHTML = `${data.main.temp.toFixed(1)}&deg;C`;

    // Weather icon and description
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const desc = data.weather[0].description;
    document.querySelector('#weather-icon').setAttribute('src', iconsrc);
    document.querySelector('#weather-icon').setAttribute('alt', desc);
    document.querySelector('figcaption').textContent = desc;

    // Humidity
    document.querySelector('#humidity').textContent = `${data.main.humidity}%`;

    // High & Low temps
    document.querySelector('#high').textContent = `${data.main.temp_max.toFixed(1)}°C`;
    document.querySelector('#low').textContent = `${data.main.temp_min.toFixed(1)}°C`;

    // Sunrise & Sunset
    const timezoneOffset = data.timezone; // in seconds
    const sunrise = new Date((data.sys.sunrise + timezoneOffset) * 1000);
    const sunset = new Date((data.sys.sunset + timezoneOffset) * 1000);

    document.querySelector('#sunrise').textContent = sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    document.querySelector('#sunset').textContent = sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}



fetchForecast();