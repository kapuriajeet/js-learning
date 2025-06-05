document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const weatherInfo = document.getElementById("weather-info");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "5f56d525d1619d0a2cd2eac4ce55588e"; //env variables

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;
    console.log(city);
    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    // Gets data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    console.log(typeof response)
    console.log(response)
    if(!response.ok) {
      throw new Error("City not found")
    }

    const data = await response.json();
    return data;
  }

  function displayWeatherData(weatherData) {
    // Displays data
    const {name, main, weather } = weatherData;
    cityName.textContent = name
    temperature.textContent = `Temperature: ${main.temp}`;
    description.textContent = `Weather: ${weather[0].description}`

    weatherInfo.classList.remove('hidden');
    errorMessage.classList.add('hidden');
  }

  function showError() {
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }
});
