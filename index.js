const apiKey = "81f1b66837c3402d84535437af98d96c";

async function getNews() {
  const query = document.getElementById("searchInput").value || "technology";
  const loading = document.getElementById("loading");
  const container = document.getElementById("newsContainer");

  loading.innerText = "Loading...";
  container.innerHTML = "";

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`
    );

    console.log("Response status:", response.status);

    if (!response.ok) {
    throw new Error("API Error");
    }

    const data = await response.json();
    console.log(data);

    loading.innerText = "";

    displayNews(data.articles);

  } catch (error) {
    loading.innerText = "API limit reached. Try again later";
    console.log(error);
  }
}

function displayNews(articles) {
  const container = document.getElementById("newsContainer");

  if (!articles || articles.length === 0) {
    container.innerHTML = "<p>No news found</p>";
    return;
  }

  articles.map(article => {
    const image = article.urlToImage || "https://via.placeholder.com/300";

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${image}" alt="">
      <h3>${article.title}</h3>
      <p>${article.description || "No description available"}</p>
      <a href="${article.url}" target="_blank">Read More →</a>
    `;

    container.appendChild(card);
  });
}
