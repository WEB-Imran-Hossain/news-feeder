import { useContext, useState } from "react";
import SearchIcon from "../../assets/icons/search.svg";
import "./Search.css";
import { NewsContext } from "../../context";

const Search = () => {
  const { searchText, setSearchText, performSearch, isSearching } =
    useContext(NewsContext);
  const [showInput, setShowInput] = useState(false);

  const handleSearch = async () => {
    if (searchText.trim()) {
      await performSearch(searchText);
    }
  };

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
            <button
              type="submit"
              className="ml-2 p-2  text-white hover:text-black font-bold border-gray-300 rounded hover:bg-gray-300 bg-[#00D991] "
            >
              Go
            </button>
          </form>
        )}
      </div>
      {isSearching && <p>Searching...</p>} {/* Display searching message */}
    </div>
  );
};

export default Search;
