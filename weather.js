const weatherApiKey = "YOUR_WEATHER_API_KEY";

async function getWeather() {
  const city = document.getElementById("cityInput").value || "Mumbai";
  const result = document.getElementById("weatherResult");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`
    );

    const data = await response.json();

    if (data.cod !== 200) {
      result.innerHTML = "City not found";
      return;
    }

    result.innerHTML = `
      <h2>${data.name}</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Weather: ${data.weather[0].main}</p>
    `;

  } catch (error) {
    result.innerHTML = "Error fetching weather";
  }
}