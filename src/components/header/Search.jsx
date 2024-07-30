import { useContext, useEffect, useState } from "react";
import SearchIcon from "../../assets/icons/search.svg";
import "./Search.css";
import { NewsContext } from "../../context";
import useDebounce from "../../hooks/useDebounce";

const Search = () => {
  const { searchText, setSearchText, performSearch, isSearching } =
    useContext(NewsContext);
  const [showInput, setShowInput] = useState(false);
  const debouncedSearchText = useDebounce(searchText, 500); // Adjust the delay as needed

  const handleSearch = async () => {
    if (debouncedSearchText.trim()) {
      await performSearch(debouncedSearchText);
    }
  };
  useEffect(() => {
    if (debouncedSearchText.trim()) {
      performSearch(debouncedSearchText);
    }
  }, [debouncedSearchText, performSearch]);

  const handleIconClick = async () => {
    if (showInput) {
      await handleSearch();
    }
    setShowInput(!showInput);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSearch();
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
          <form onSubmit={handleSubmit} className="flex items-center ml-2">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search for news..."
              className="p-2 border border-gray-300 rounded focus:outline-none input-transition"
            />
          </form>
        )}
      </div>
      {isSearching && <p>Searching...</p>} {/* Display searching message */}
    </div>
  );
};

export default Search;
