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

    displayCountry(data[0]);

  } catch (error) {
    loading.innerText = "Country not found";
    console.log(error);
  }
}

function displayCountry(country) {
  const container = document.getElementById("countryContainer");

  container.innerHTML = `
    <div class="card">
      <img src="${country.flags.png}">
      <h2>${country.name.common}</h2>
      <p><strong>Capital:</strong> ${country.capital?.[0]}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Currency:</strong> ${Object.values(country.currencies)[0].name}</p>
    </div>
  `;
}