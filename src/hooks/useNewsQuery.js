import { useEffect, useState } from "react";

const useNewsQuery = () => {
  const [newsData, setNewsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCategory, setNewCategory] = useState("general"); // Default category
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      setLoading(true); // Set loading state to true
      setError(null); // Clear any previous error

      // Array of news categories to fetch
      const categories = [
        "general",
        "business",
        "entertainment",
        "health",
        "science",
        "sports",
        "technology",
      ];

      // Object to store news data for each category
      const newsData = {};

      for (const category of categories) {
        try {
          const response = await fetch(
            `http://localhost:8000/v2/top-headlines?category=${category}`
          );
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const data = await response.json();
          newsData[category] = data.articles || [];
        } catch (err) {
          setError(err.message || "An error occurred");
          setLoading(false);
          return;
        }
      }

      setNewsData(newsData);
      setLoading(false);
    };

    fetchNewsData();
  }, []);

  const performSearch = async () => {
    setSearchLoading(true);
    setSearchError(null);
    try {
      const response = await fetch(`http://localhost:8000/v2/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setSearchResults(data.articles || []);
    } catch (err) {
      setSearchError(err.message || "An error occurred");
    }
    setSearchLoading(false);
  };
  

  return {
    newsData,
    loading,
    error,
    newCategory,
    setNewCategory,
    searchQuery,
    setSearchQuery,
    searchResults,
    searchLoading,
    searchError,
    performSearch,
  };
};

export default useNewsQuery;
