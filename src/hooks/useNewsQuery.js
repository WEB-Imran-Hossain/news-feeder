import { useEffect, useState } from "react";

const useNewsQuery = () => {
  const [newsData, setNewsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCategory, setNewCategory] = useState("general"); // Default category
  

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  
// For News
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

  // For Search field
  useEffect(() => {
    const performSearch = async () => {
      const normalizedSearchText = searchText.trim().toLowerCase(); // Normalize case
  
      if (!normalizedSearchText) return; // Skip if search text is empty
  
      setSearchLoading(true);
      setSearchError(null);
  
      // Array of search queries (in this case, just one, but you can extend this)
      const searchQueries = [normalizedSearchText];
  
      // Object to store search results for each query
      const searchResults = {};
  
      for (const query of searchQueries) {
        try {
          const response = await fetch(`http://localhost:8000/v2/search?q=${encodeURIComponent(query)}`);
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const data = await response.json();
          searchResults[query] = data.articles || [];
        } catch (err) {
          setSearchError(err.message || "An error occurred");
          setSearchLoading(false);
          return;
        }
      }
  
      setSearchResults(searchResults);
      setSearchLoading(false);
    };
  
    performSearch();
  }, [searchText]); // Dependency array: perform search when searchText changes
  
  

  return {
    newsData,
    loading,
    error,
    newCategory,
    setNewCategory,
    searchText,
    setSearchText,
    searchResults,
    searchLoading,
    searchError
  };
};

export default useNewsQuery;
