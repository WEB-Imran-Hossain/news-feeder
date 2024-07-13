import SearchIcon from "../../assets/icons/search.svg";

const Search = () => {
  return (
    <div>
      {/* search*/}
      <div className="flex items-center space-x-3 lg:space-x-8">
        <img src={SearchIcon} />
      </div>
    </div>
  );
};

export default Search;
