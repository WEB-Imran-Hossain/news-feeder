import { useContext, useState } from "react";
import SearchIcon from "../../assets/icons/search.svg";
import { NewsContext } from "../../context";

const Search = () => {
  const { newsData,searchQuery,
    setSearchQuery,
    searchResults,
    searchLoading,
    searchError,
    performSearch } = useContext(NewsContext);

    console.log(" data seen", newsData);

  const [showInput, setShowInput] = useState(false);
  const [noArticles, setNoArticles] = useState(false);

   const handleSearch = async () => {
    if (searchQuery.trim()) {
      await performSearch(searchQuery);
      setNoArticles(searchResults.length === 0);
    }
  };

  const handleIconClick = async () => {
    if (showInput) {
      // Perform search and hide input
      await handleSearch();
      setShowInput(false);
    } else {
      // Show input
      setShowInput(true);
    }
  };

  const isValidResults = Array.isArray(searchResults);

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for news..."
            className="ml-2 p-2 border border-gray-300 rounded transition-width duration-300"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch(); // Perform search on Enter key press
              }
            }}
          />
        )}
      </div>
      <div>
        {searchLoading && <p>Searching...</p>}
        {searchError && <p>Error fetching search results: {searchError}</p>}
        {!searchLoading && !searchError && (
          <>
            {isValidResults && searchResults.length > 0 ? (
              <ul>
                {searchResults.map((article, index) => (
                  <li key={index} className="mb-2">
                    <h2 className="text-xl font-bold">{article.title}</h2>
                    <p>{article.description}</p>
                  </li>
                ))}
              </ul>
            ) : noArticles ? (
              <p>No articles found</p>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
