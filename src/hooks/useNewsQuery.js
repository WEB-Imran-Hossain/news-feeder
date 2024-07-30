import { useEffect, useState } from "react";

const useNewsQuery = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("all"); // Default category

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const url = category === "all"
        ? `http://localhost:8000/v2/top-headlines`
        : `http://localhost:8000/v2/top-headlines?category=${category}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setNewsData(data.articles);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  return {
    newsData,
    loading,
    error,
    category,
    setCategory,
  };
};

export default useNewsQuery;
