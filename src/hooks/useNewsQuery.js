import { useEffect, useState } from "react";

const useNewsQuery = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("all"); // Default category

  useEffect(() => {
    getData();
  }, [category]);

  async function getData() {
    try {
      setLoading(true);
      setError(null);
      let combinedData = [];

      if (category === "all") {
        // If 'uncategorized', fetch data without a category
        const response = await fetch(`http://localhost:8000/v2/top-headlines`);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const { articles } = await response.json();
        combinedData = articles;
      } else {
        // Fetch data for the selected category
        const response = await fetch(
          `http://localhost:8000/v2/top-headlines?category=${category}`
        );
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const { articles } = await response.json();
        combinedData = articles;
      }

      setNewsData(combinedData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    newsData,
    loading,
    error,
    category,
    setCategory,
  };
};

export default useNewsQuery;
