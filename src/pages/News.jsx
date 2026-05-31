import { useState, useEffect, useRef } from 'react';

const apiKey = "21c8d31b465e09b8bbc33f8801a891d5";

export default function News() {
  const [inputValue, setInputValue] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const timeoutRef = useRef(null);

  const getNews = async (searchQuery) => {
    const activeQuery = searchQuery || "technology";
    setLoading(true);
    setErrorMsg("");
    setArticles([]);

    try {
      const isLocal = window.location.hostname === "localhost" || 
                      window.location.hostname === "127.0.0.1" || 
                      window.location.protocol === "file:";

      const url = isLocal 
        ? `https://gnews.io/api/v4/search?q=${encodeURIComponent(activeQuery)}&lang=en&max=10&token=${apiKey}`
        : `/api/news?q=${encodeURIComponent(activeQuery)}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      setErrorMsg("Error loading news");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Set document title and run default load on mount
  useEffect(() => {
    document.title = "InfoSphere - News";
    getNews("technology");

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Handle manual Search button click
  const handleSearchClick = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    getNews(inputValue || "technology");
  };

  // Debounced search on input change
  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      getNews(val || "technology");
    }, 300);
  };

  return (
    <div className="container">
      <h1>News Dashboard</h1>

      <div className="search-box">
        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text" 
          id="searchInput" 
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search news (e.g. technology)..."
        />
        <button className="primary-btn" onClick={handleSearchClick}>Search</button>
      </div>

      {loading && <p id="loading">Loading...</p>}
      {errorMsg && <p id="loading">{errorMsg}</p>}

      {!loading && !errorMsg && (
        <div id="newsContainer">
          {articles.length === 0 ? (
            <p>No news found</p>
          ) : (
            articles.map((article, idx) => {
              const image = article.image || "https://via.placeholder.com/300";
              return (
                <div className="card" key={idx}>
                  <img src={image} alt={article.title || "News cover"} />
                  <h3>{article.title}</h3>
                  <p>{article.description || "No description available"}</p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">Read More →</a>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
