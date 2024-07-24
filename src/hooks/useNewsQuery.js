import { useEffect, useState } from "react";

const useNewsQuery = () => {
  const [newsData, setNewsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCategory, setNewCategory] = useState("general"); // Default category

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

  return { newsData, loading, error, newCategory, setNewCategory };
};

export default useNewsQuery;
