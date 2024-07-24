import { NewsContext } from "../context";
import useNewsQuery from "../hooks/useNewsQuery";

const NewsProvider = ({ children }) => {
  const {  newsData,
    loading,
    error,
    newCategory,
    setNewCategory,
    searchText,
    setSearchText,
    searchResults,
    searchLoading,
    searchError,
    performSearch, } =
    useNewsQuery();

  const contextValue = {
    newsData,
    loading,
    error,
    newCategory,
    setNewCategory,
    searchText,
    setSearchText,
    searchResults,
    searchLoading,
    searchError,
    performSearch,
  };

  return (
    <NewsContext.Provider value={contextValue}>
      {children}
      </NewsContext.Provider>
  );
};

export default NewsProvider;
