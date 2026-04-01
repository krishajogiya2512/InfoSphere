const apiKey = "e3f4c0a7f3463df75515fda4baa364d4";

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

    if (!response.ok) {
    throw new Error("API Error");
    }

    const data = await response.json();
    console.log(data);

    loading.innerText = "";

    displayNews(data.articles);

  } catch (error) {
    loading.innerText = "Error loading data";
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
    const image = article.image || "https://via.placeholder.com/300";

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

getNews();