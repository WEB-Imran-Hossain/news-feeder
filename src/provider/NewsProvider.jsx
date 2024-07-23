import { NewsContext } from "../context";
import useNewsQuery from "../hooks/useNewsQuery";

const NewsProvider = ({ children }) => {
  const { newsData, loading, error, newCategory, setNewCategory } =
    useNewsQuery();

  const contextValue = {
    newsData,
    loading,
    error,
    newCategory,
    setNewCategory,
  };

  return (
    <NewsContext.Provider value={contextValue}>
      {children}
      </NewsContext.Provider>
  );
};

export default NewsProvider;
