const apiKey = "21c8d31b465e09b8bbc33f8801a891d5";

async function getNews() {
  const query = document.getElementById("searchInput").value || "technology";
  const loading = document.getElementById("loading");
  const container = document.getElementById("newsContainer");

  loading.innerText = "Loading...";
  container.innerHTML = "";

  try {
    const response = await fetch(
      `https://gnews.io/api/v4/search?q=${query}&lang=en&max=10&token=${apiKey}`
    );

    const data = await response.json();

    loading.innerText = "";
    displayNews(data.articles);

  } catch (error) {
    loading.innerText = "Error loading news";
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
    const image = article.image || "https://via.placeholder.com/300";

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