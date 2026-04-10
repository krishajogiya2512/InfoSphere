const apiKey = "21c8d31b465e09b8bbc33f8801a891d5";

async function getNews() {
  const query = document.getElementById("searchInput").value || "technology";
  const loading = document.getElementById("loading");
  const container = document.getElementById("newsContainer");

  loading.innerText = "Loading...";
  container.innerHTML = "";

  try {
    const isLocal = window.location.hostname === "localhost" || 
                    window.location.hostname === "127.0.0.1" || 
                    window.location.protocol === "file:";

    // Use direct API on local/file (GNews allows this on free tier), 
    // otherwise use Vercel Serverless proxy to bypass CORS on production.
    const url = isLocal 
      ? `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=10&token=${apiKey}`
      : `/api/news?q=${encodeURIComponent(query)}`;

    const response = await fetch(url);

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

function toggleTheme() {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
      localStorage.setItem("theme", "light");
  } else {
      localStorage.setItem("theme", "dark");
  }
}

let newsTimeout;
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
    }
    document.getElementById("searchInput")?.addEventListener("input", () => {
        clearTimeout(newsTimeout);
        newsTimeout = setTimeout(getNews, 300);
    });
    
    // Default load
    getNews();
});