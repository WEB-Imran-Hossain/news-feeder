import ThumbnileOne from "../../assets/icons/thumb_lg.png";
import { useContext } from "react";
import { NewsContext } from "../../context";

const NewsBoard = () => {
  const { newsData, searchResults, loading, error, searchText, isSearching } =
    useContext(NewsContext);

  if (loading || isSearching) {
    return <p>Searching...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const newsItems = searchText ? searchResults : newsData;

  const renderNewsItems = (newsItems) => {
    if (!newsItems.length) {
      return <p>No news available</p>;
    }

    return newsItems.map((newsItem, index) => (
      <div
        key={index}
        className="border border-gray-200 p-4 rounded-lg shadow-md"
      >
        <a href={newsItem.url}>
          <h2 className="mb-2.5 text-xl font-bold lg:text-2xl text-[#292219] hover:text-[#00D991] transition-colors duration-300">
            {newsItem.title}
          </h2>
        </a>
        <p className="text-base text-[#292219]">{newsItem.description}</p>
        <p className="mt-5 text-base text-[#94908C]">
          Published on:{" "}
          {newsItem.publishedAt
            ? new Date(newsItem.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "Unknown"}
        </p>
        {newsItem.urlToImage ? (
          <img
            className="w-full"
            src={newsItem.urlToImage}
            alt={newsItem.title || "News thumbnail"}
          />
        ) : newsItem.url ? (
          <div>
            <video className="w-full" controls>
              <source src={newsItem.url} type="video/mp4" />
            </video>
          </div>
        ) : (
          <img
            className="w-full"
            src={ThumbnileOne}
            alt="Default news thumbnail"
          />
        )}
      </div>
    ));
  };

  return (
    <main className="my-10 lg:my-14">
      <div className="w-[80%] mx-auto">
        {searchText && searchResults.length === 0 && (
          <p>No search results found</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {renderNewsItems(newsItems)}
        </div>
      </div>
    </main>
  );
};

export default NewsBoard;
