import { useState } from "react";
import SearchIcon from "../../assets/icons/search.svg";

const Search = () => {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [noArticles, setNoArticles] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/v2/search?q=${query}`);
      const data = await response.json();
      setArticles(data.articles);
      setNoArticles(data.articles.length === 0);
    } catch (error) {
      console.error('Error fetching the news:', error);
      setNoArticles(true);
    }
  };

  const handleIconClick = () => {
    if (showInput) {
      if (query) {
        handleSearch(); // Perform search when input is visible and query is not empty
      }
      setShowInput(false); // Hide input after searching or if input is empty
    } else {
      setShowInput(true); // Show input if it was previously hidden
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center">
        <img
          onClick={handleIconClick}
          className="w-6 h-6 cursor-pointer"
          src={SearchIcon}
          alt="Search"
        />
        {showInput && (
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for news..."
            className="ml-2 p-2 border border-gray-300 rounded transition-width duration-300"
          />
        )}
      </div>
      <div>
        {articles.length > 0 ? (
          <ul>
            {articles.map((article, index) => (
              <li key={index} className="mb-2">
                <h2 className="text-xl font-bold">{article.title}</h2>
                <p>{article.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          noArticles && <p>No articles found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
