// Html UI Elements
let cityInput = document.getElementById('cityInput');
let getWeatherBtn = document.querySelector("form");
let weatherResult = document.getElementById('weatherResult');

// Fetching city data and weather data from APIs
let fCity = async (city) => {
    try {
        let response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
        response = await response.json();
        let data = response.results[0];
        return data;
    } catch (error) {
       console.error('Error fetching data:', error); 
    }
}

// Fetching weather data using latitude and longitude
let fWeather = async (lat, lan) => {
    try {
        let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lan}&current_weather=true`);
        response = await response.json();
        return response;
    } catch (error) {
       console.error('Error fetching data:', error); 
    }
}

// Displaying weather data on the UI
let displayWeather = (weatherData, city) => {
    // Formatting time to 12-hour format with AM/PM
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let formattedTime = `${hours}:${minutes} ${ampm}`;
    // Updating the weather result section with the fetched data
    weatherResult.innerHTML = `
        <h2>Current Weather in ${city}</h2>
        <p>Temperature: ${weatherData.current_weather.temperature} °C</p>
        <p>Wind Speed: ${weatherData.current_weather.windspeed} m/s</p>
        <p>Wind direction: ${weatherData.current_weather.winddirection} °</p>
        <p>Time: ${formattedTime}</p>
    `;
}

// Event listener for form submission to fetch and display weather data
getWeatherBtn.addEventListener('submit', async (e) => {
    e.preventDefault();
    let city = cityInput.value;
    let data = await fCity(city);
    let lat = data.latitude;
    let lan = data.longitude;
    let weatherData = await fWeather(lat, lan);
    displayWeather(weatherData, city);
})  