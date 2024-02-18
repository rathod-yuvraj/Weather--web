var currentUnit = 'C';

function search() {
    var cityInput = document.querySelector(".cityInput").value;
    if (cityInput === "") {
        return;
    }
    var API_KEY = "0a4aa3e922d90ae4909ad2c58909b029";
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=Metric&appid=${API_KEY}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById("humidityPercent").innerText = data.main.humidity + "%";

            document.getElementById("windRate").innerText = data.wind.speed + " km/h";


            // temperature get by api
            updateTemperature(data.main.temp);
            
            document.getElementById("weatherLocation").innerText = data.name;


            var weatherIcon = data.weather[0].icon;
            var iconUrl = getIconUrl(weatherIcon);

            document.getElementById("weatherIcon").src = iconUrl;
            // time date call by api
            displayDateTime(data.dt);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function getIconUrl(iconCode) {
    switch (iconCode) {
        case "01d":
        case "01n":
            return "clear.png";
        case "02d":
        case "02n":
            return "cloud.png";
        case "03d":
        case "03n":
            return "drizzle.png";
        case "04d":
        case "04n":
            return "drizzle.png";
        case "09d":
        case "09n":
            return "rain.png";
        case "10d":
        case "10n":
            return "rain.png";
        case "13d":
        case "13n":
            return "snow.png";
        default:
            return "clear.png";
    }
}

function updateTemperature(celsiusTemp) {
    var tempDisplay = document.getElementById("weatherTemp");
    var backgroundClass = "";

    // Set background color based on temperature value
    if (celsiusTemp >= 30) {
        backgroundClass = "hot";
    } else if (celsiusTemp >= 20) {
        backgroundClass = "warm";
    } else if (celsiusTemp >= 10) {
        backgroundClass = "moderate";
    } else {
        backgroundClass = "cold";
    }

    // Set the temperature and background color
    tempDisplay.innerText = celsiusTemp + "°C";
    tempDisplay.className = "weather-temp" + backgroundClass;
}

function toggleTemperature(unit) {
currentUnit = unit;
// Fetch current weather data again and update temperature display
search();
}

function updateTemperature(celsiusTemp) {
var tempDisplay = document.getElementById("weatherTemp");
var backgroundClass = "";

// Convert temperature based on the selected unit
var displayTemp;
switch (currentUnit) {
case 'C':
    displayTemp = celsiusTemp;
    break;
case 'K':
    displayTemp = convertToKelvin(celsiusTemp);
    break;
case 'F':
    displayTemp = convertToFahrenheit(celsiusTemp);
    break;
default:
    displayTemp = celsiusTemp;
}

// Set background color based on temperature value
if (displayTemp >= 30) {
backgroundClass = "hot";
} else if (displayTemp >= 20) {
backgroundClass = "warm";
} else if (displayTemp >= 10) {
backgroundClass = "moderate";
} else {
backgroundClass = "cold";
}

// Set the temperature and background color
tempDisplay.innerText = displayTemp + getUnitSymbol();
tempDisplay.className = "weather-temp " + backgroundClass;
}

function getUnitSymbol() {
switch (currentUnit) {
case 'C':
    return "°C";
case 'K':
    return "K";
case 'F':
    return "°F";
default:
    return "°C";
}
}

function convertToKelvin(celsiusTemp) {
return (celsiusTemp + 273.15).toFixed(2);
}

function convertToFahrenheit(celsiusTemp) {
return ((celsiusTemp * 9/5) + 32).toFixed(2);
}


function displayDateTime(timestamp) {
    var date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    var dateTimeDisplay = document.getElementById("dateTime");
    var dateTimeString = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    dateTimeDisplay.innerText = dateTimeString;
}
