import { useState, useEffect, useRef } from 'react';

const apiKey = "a6871b4d7ac720d6d337dc1adcff33a8";

export default function Weather() {
  const [inputValue, setInputValue] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const timeoutRef = useRef(null);

  const getWeather = async (cityQuery) => {
    const city = cityQuery || "Mumbai";
    setLoading(true);
    setErrorMsg("");
    setWeatherData(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );

      if (!res.ok) {
        throw new Error("City not found");
      }

      const data = await res.json();
      setWeatherData(data);
    } catch (err) {
      setErrorMsg("Weather not found / API issue");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Set document title and run default load on mount
  useEffect(() => {
    document.title = "Weather";
    getWeather("Mumbai");

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Handle manual Search button click
  const handleSearchClick = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    getWeather(inputValue || "Mumbai");
  };

  // Debounced search on input change
  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      getWeather(val || "Mumbai");
    }, 300);
  };

  return (
    <div className="container">
      <h1>Weather Dashboard</h1>
      <p className="subtitle">Check real-time weather updates</p>

      <div className="search-box">
        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text" 
          id="cityInput" 
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter city name (e.g. London)..."
        />
        <button className="primary-btn" onClick={handleSearchClick}>Search</button>
      </div>

      {loading && <p id="loading">Loading...</p>}
      {errorMsg && <p id="loading">{errorMsg}</p>}

      {!loading && !errorMsg && weatherData && (
        <div id="weatherContainer">
          <div className="card">
            <img 
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
              style={{ width: '80px' }} 
              alt={weatherData.weather[0].description}
            />
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <h3>{weatherData.main.temp}°C</h3>
            <p>{weatherData.weather[0].description}</p>
            <p>💧 Humidity: {weatherData.main.humidity}%</p>
            <p>🌬 Wind: {weatherData.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}
