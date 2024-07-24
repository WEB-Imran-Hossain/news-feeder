import { useContext, useState } from "react";
import SearchIcon from "../../assets/icons/search.svg";
import { NewsContext } from "../../context";
import './Search.css'

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
    <div className="flex items-center space-x-3 lg:space-x-8">
      <div className="flex justify-center items-center">
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
            className="ml-2 p-2 border border-gray-300 rounded focus:outline-none input-transition"
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
