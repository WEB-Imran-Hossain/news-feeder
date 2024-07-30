import { useContext, useEffect, useState } from "react";
import SearchIcon from "../../assets/icons/search.svg";
import "./Search.css";
import { NewsContext } from "../../context";
import useDebounce from "../../hooks/useDebounce";

const Search = () => {
  const { searchText, setSearchText, isSearching, performSearch } =
    useContext(NewsContext);
  const [showInput, setShowInput] = useState(false);

  const debouncedText = useDebounce(searchText, 500);

  useEffect(() => {
    let mount = false;

    if (!mount) {
      performSearch(debouncedText.trim());
    }
    return () => {
      mount = true;
    };
  }, [debouncedText]);

  const handleIconClick = () => {
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
          <form className="flex items-center ml-2">
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
