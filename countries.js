async function getCountry() {
  const name = document.getElementById("countryInput").value;
  const result = document.getElementById("countryResult");

  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${name}`
    );

    const data = await response.json();
    const country = data[0];

    result.innerHTML = `
      <h2>${country.name.common}</h2>
      <p>Capital: ${country.capital}</p>
      <p>Population: ${country.population}</p>
      <img src="${country.flags.png}" width="150">
    `;

  } catch (error) {
    result.innerHTML = "Country not found";
  }
}