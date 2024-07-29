import { useEffect, useState } from "react";
import { NewsContext } from "../context";
import useNewsQuery from "../hooks/useNewsQuery";

const NewsProvider = ({ children }) => {
  const { newsData, loading, error, category, setCategory } = useNewsQuery();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = async (query) => {
    setIsSearching(true);
    try {
      const response = await fetch(
        `http://localhost:8000/v2/search?q=${query}`
      );
      const data = await response.json();
      setSearchResults(data.result);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const contextValue = {
    newsData,
    loading,
    error,
    category,
    setCategory,
    searchText,
    setSearchText,
    searchResults,
    performSearch,
    isSearching,
  };

  return (
    <NewsContext.Provider value={contextValue}>{children}</NewsContext.Provider>
  );
};

export default NewsProvider;
