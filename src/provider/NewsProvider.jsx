import { NewsContext } from "../context";
import useNewsQuery from "../hooks/useNewsQuery";

const NewsProvider = ({ children }) => {
  const { newsData, loading, error, newCategory, setNewCategory } = useNewsQuery();

  return (
    <NewsContext.Provider value={{ newsData, loading, error, newCategory, setNewCategory }}>
      {children}
    </NewsContext.Provider>
  );
};

export default NewsProvider;
