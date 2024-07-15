import { useState } from "react";

const useNewsQuery = () => {
  // categorywise data
  const [newsData, setNewsData] = useState({
    general: "",
    bussiness: "",
    entertainment: "",
    health: "",
    science: "",
    sports: "",
    technology: "",
  });

  const [loading, setLoading] = useState({
    state: false,
    message: "",
  });

  const [error, setError] = useState(null);

  return {
    newsData,
    loading,
    error
  }
};

export default useNewsQuery;
