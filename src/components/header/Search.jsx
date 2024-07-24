import { useContext, useState } from "react";
import SearchIcon from "../../assets/icons/search.svg";
import { NewsContext } from "../../context";

const Search = () => {
  const { searchText,
    setSearchText,
    searchResults,
    searchLoading,
    searchError,
    performSearch } = useContext(NewsContext);



  const [showInput, setShowInput] = useState(false);

  const handleSearch = async () => {
    if (searchText.trim()) {
      await performSearch();
    }
  };

  const handleIconClick = async () => {
    if (showInput) {
      await handleSearch();
    }
    setShowInput(!showInput);
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
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search for news..."
            className="ml-2 p-2 border border-gray-300 rounded transition-width duration-300"
          />
        )}
      </div>
      <div>
        {searchLoading && <p>Searching...</p>}
        {searchError && <p>Error fetching search results: {searchError}</p>}
        {!searchLoading && !searchError && searchResults.length > 0 && (
          <ul>
            {searchResults.map((article, index) => (
              <li key={index} className="mb-2">
                <h2 className="text-xl font-bold">{article.title}</h2>
                <p>{article.description}</p>
              </li>
            ))}
          </ul>
        )}
        {!searchLoading && !searchError && searchResults.length === 0
        }
      </div>
    </div>
  );
};

export default Search;
