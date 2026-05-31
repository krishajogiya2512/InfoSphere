import { useState, useEffect, useRef } from 'react';

export default function Countries() {
  const [inputValue, setInputValue] = useState("");
  const [rawCountries, setRawCountries] = useState([]);
  const [regionFilter, setRegionFilter] = useState("");
  const [sortByPop, setSortByPop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favCountries') || '[]');
  });

  const timeoutRef = useRef(null);

  const getCountry = async (searchQuery) => {
    if (!searchQuery) {
      alert("Please enter a country name");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setRawCountries([]);
    setRegionFilter("");
    setSortByPop(false);

    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${searchQuery}`);
      if (!res.ok) {
        throw new Error("Country not found");
      }
      const data = await res.json();
      setRawCountries(data || []);
    } catch (error) {
      setErrorMsg("Country not found");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getRandomCountries = async () => {
    setLoading(true);
    setErrorMsg("");
    setRawCountries([]);
    setRegionFilter("");
    setSortByPop(false);

    try {
      const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population,currencies");
      if (!res.ok) {
        throw new Error("Failed to fetch random countries");
      }
      const data = await res.json();
      
      const shuffled = data.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 8);
      setRawCountries(selected);
    } catch (error) {
      setErrorMsg("Error loading random countries");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Set document title and run default load on mount
  useEffect(() => {
    document.title = "Countries - InfoSphere";
    getRandomCountries();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Handle manual Search button click
  const handleSearchClick = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    getCountry(inputValue);
  };

  // Debounced search on input change
  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (val.trim()) {
      timeoutRef.current = setTimeout(() => {
        getCountry(val);
      }, 300);
    }
  };

  // Favorite toggle handler
  const toggleFavorite = (countryName) => {
    let updatedFavs = [...favorites];
    if (updatedFavs.includes(countryName)) {
      updatedFavs = updatedFavs.filter(name => name !== countryName);
    } else {
      updatedFavs.push(countryName);
    }
    setFavorites(updatedFavs);
    localStorage.setItem('favCountries', JSON.stringify(updatedFavs));
  };

  // Sort handler
  const sortByPopulation = () => {
    setSortByPop(true);
  };

  // Process derived country list
  let displayedCountries = [...rawCountries];
  if (regionFilter) {
    displayedCountries = displayedCountries.filter(c => c.region === regionFilter);
  }
  if (sortByPop) {
    displayedCountries.sort((a, b) => (b.population || 0) - (a.population || 0));
  }

  return (
    <div className="container">
      <h1>Countries Dashboard</h1>
      <p className="subtitle">Explore country details</p>

      <p style={{ textAlign: 'center', color: '#60a5fa', marginTop: '10px' }}>
        Discover countries across the world
      </p>

      <div className="search-box">
        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text" 
          id="countryInput" 
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter country name..."
        />
        <button className="primary-btn" onClick={handleSearchClick}>Search</button>
      </div>

      <div className="controls">
        <select 
          id="regionFilter" 
          value={regionFilter} 
          onChange={(e) => setRegionFilter(e.target.value)}
        >
          <option value="">All Regions</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Oceania">Oceania</option>
        </select>

        <button onClick={sortByPopulation}>Sort by Population</button>
      </div>

      {loading && <p id="loading">Loading...</p>}
      {errorMsg && <p id="loading">{errorMsg}</p>}

      {!loading && !errorMsg && (
        <div id="countryContainer">
          {displayedCountries.length === 0 ? (
            <p>No countries found</p>
          ) : (
            displayedCountries.map((country, idx) => {
              const nameCommon = country.name?.common || "N/A";
              const isFav = favorites.includes(nameCommon);
              const capitalName = country.capital ? country.capital[0] : "N/A";
              const currencyName = country.currencies ? Object.values(country.currencies)[0].name : "N/A";
              const flagUrl = country.flags?.png || '';

              return (
                <div className="card" key={nameCommon + idx}>
                  {flagUrl && <img src={flagUrl} alt={`${nameCommon} flag`} />}
                  <h2>{nameCommon}</h2>

                  <button 
                    className={`fav-btn ${isFav ? 'active-fav' : ''}`}
                    onClick={() => toggleFavorite(nameCommon)}
                  >
                    {isFav ? 'Favorited' : 'Favorite'}
                  </button>

                  <p><strong>Capital:</strong> {capitalName}</p>
                  <p><strong>Region:</strong> {country.region || "N/A"}</p>
                  <p><strong>Population:</strong> {country.population?.toLocaleString() || "0"}</p>
                  <p><strong>Currency:</strong> {currencyName}</p>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
