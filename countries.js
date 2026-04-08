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

  countries.forEach(country => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${country.flags.png}">
      <h2>${country.name.common}</h2>

      <button class="fav-btn" onclick="toggleFavorite(this)">
        Favorite
      </button>

      <p><strong>Capital:</strong> ${country.capital?.[0]}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Currency:</strong> ${Object.values(country.currencies)[0].name}</p>
    `;

    container.appendChild(card);
  });
}

function toggleFavorite(button) {
  if (button.innerText.includes("")) {
    button.innerText = "Favorited";
    button.style.background = white;
  } else {
    button.innerText = "Favorite";
    button.style.background = "#334155";
  }
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