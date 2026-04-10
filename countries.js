let allCountries = []; 

async function getCountry() {
  const country = document.getElementById("countryInput").value;
  const loading = document.getElementById("loading");
  const container = document.getElementById("countryContainer");

  if (!country) {
    alert("Please enter a country name");
    return;
  }

  loading.innerText = "Loading...";
  container.innerHTML = "";

  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );

    const data = await res.json();

    loading.innerText = "";

    allCountries = data; 

    displayCountries(allCountries);

  } catch (error) {
    loading.innerText = "Country not found";
    console.log(error);
  }
}

function displayCountries(countries) {
  const container = document.getElementById("countryContainer");

  container.innerHTML = "";

  if (!countries || countries.length === 0) {
    container.innerHTML = "<p>No countries found</p>";
    return;
  }

  let favs = JSON.parse(localStorage.getItem('favCountries') || '[]');

  countries.forEach(country => {
    const card = document.createElement("div");
    card.classList.add("card");
    
    let isFav = favs.includes(country.name.common);
    let capitalName = country.capital ? country.capital[0] : "N/A";
    let currencyName = country.currencies ? Object.values(country.currencies)[0].name : "N/A";

    card.innerHTML = `
      <img src="${country.flags?.png || ''}">
      <h2>${country.name.common}</h2>

      <button class="fav-btn ${isFav ? 'active-fav' : ''}" onclick="toggleFavorite(this, '${country.name.common.replace(/'/g, "\\'")}')">
        ${isFav ? 'Favorited' : 'Favorite'}
      </button>

      <p><strong>Capital:</strong> ${capitalName}</p>
      <p><strong>Region:</strong> ${country.region || "N/A"}</p>
      <p><strong>Population:</strong> ${country.population?.toLocaleString() || "0"}</p>
      <p><strong>Currency:</strong> ${currencyName}</p>
    `;

    container.appendChild(card);
  });
}

function toggleFavorite(button, countryName) {
  let favs = JSON.parse(localStorage.getItem('favCountries') || '[]');
  
  if (favs.includes(countryName)) {
    favs = favs.filter(name => name !== countryName);
    button.innerText = "Favorite";
    button.classList.remove("active-fav");
  } else {
    favs.push(countryName);
    button.innerText = "Favorited";
    button.classList.add("active-fav");
  }
  
  localStorage.setItem('favCountries', JSON.stringify(favs));
}

function filterByRegion() {
  const region = document.getElementById("regionFilter").value;

  if (!region) {
    displayCountries(allCountries);
    return;
  }

  const filtered = allCountries.filter(c => c.region === region);

  displayCountries(filtered);
}

function sortByPopulation() {
  const sorted = [...allCountries].sort(
    (a, b) => b.population - a.population
  );

  displayCountries(sorted);
}

function toggleTheme() {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
      localStorage.setItem("theme", "light");
  } else {
      localStorage.setItem("theme", "dark");
  }
}

let countryTimeout;
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
    }
    document.getElementById("countryInput")?.addEventListener("input", () => {
        clearTimeout(countryTimeout);
        countryTimeout = setTimeout(getCountry, 300);
    });
    
    // Default load
    getRandomCountries();
});

async function getRandomCountries() {
  const loading = document.getElementById("loading");
  const container = document.getElementById("countryContainer");
  loading.innerText = "Loading...";
  container.innerHTML = "";
  try {
    const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population,currencies");
    const data = await res.json();
    loading.innerText = "";
    
    const shuffled = data.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 8);
    
    allCountries = selected;
    displayCountries(allCountries);
  } catch (error) {
    loading.innerText = "Error loading random countries";
    console.log(error);
  }
}