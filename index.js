const apiKey = "YOUR_NEWS_API_KEY"; // 🔥 replace if needed

async function getNews() {
  const query = document.getElementById("searchInput").value || "technology";
  const loading = document.getElementById("loading");
  const container = document.getElementById("newsContainer");

  loading.innerText = "Loading...";
  container.innerHTML = "";

  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`
    );
    // const response = await fetch(
    //   `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`
    // );

    if (!response.ok) {
      throw new Error("API Error");
    }

    const data = await response.json();

    loading.innerText = "";
    displayNews(data.articles);

  } catch (error) {
    loading.innerText = "API not working / limit reached";
    console.log(error);
  }
}

function displayNews(articles) {
  const container = document.getElementById("newsContainer");

  if (!articles || articles.length === 0) {
    container.innerHTML = "<p>No news found</p>";
    return;
  }

  articles.forEach(article => {
    const image = article.urlToImage || "https://via.placeholder.com/300";

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${image}">
      <h3>${article.title}</h3>
      <p>${article.description || "No description available"}</p>
      <a href="${article.url}" target="_blank">Read More →</a>
    `;

    container.appendChild(card);
  });
}