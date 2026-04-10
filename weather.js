const apiKey = "a6871b4d7ac720d6d337dc1adcff33a8";

async function getWeather() {
  const city = document.getElementById("cityInput").value || "Mumbai";
  const container = document.getElementById("weatherContainer");
  const loading = document.getElementById("loading");

  loading.innerText = "Loading...";
  container.innerHTML = "";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    if (!res.ok) {
      throw new Error("City not found");
    }

    const data = await res.json();

    loading.innerText = "";

    displayWeather(data);

  } catch (err) {
    loading.innerText = "Weather not found / API issue";
    console.log(err);
  }
}

function displayWeather(data) {
  const container = document.getElementById("weatherContainer");

  const icon = data.weather[0].icon;

  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" style="width:80px;">
    <h2>${data.name}, ${data.sys.country}</h2>
    <h3>${data.main.temp}°C</h3>
    <p>${data.weather[0].description}</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>🌬 Wind: ${data.wind.speed} m/s</p>
  `;

  container.appendChild(card);
}

function toggleTheme() {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
      localStorage.setItem("theme", "light");
  } else {
      localStorage.setItem("theme", "dark");
  }
}

let weatherTimeout;
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
    }
    document.getElementById("cityInput")?.addEventListener("input", () => {
        clearTimeout(weatherTimeout);
        weatherTimeout = setTimeout(getWeather, 300);
    });
    
    // Default load
    getWeather();
});