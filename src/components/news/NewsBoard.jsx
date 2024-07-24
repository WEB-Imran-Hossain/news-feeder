import ThumbnileOne from "../../assets/icons/thumb_lg.png";
import { useContext } from "react";
import { NewsContext } from "../../context";

const NewsBoard = () => {
  const {
    newsData,
    newCategory,
    searchResults,
    searchText,
    searchLoading,
    searchError,
  } = useContext(NewsContext);

  if (searchLoading) {
    return <p>Searching...</p>;
  }

  if (searchError) {
    return <p>Error: {searchError}</p>;
  }

  const articlesToDisplay = searchText
    ? searchResults[searchText] || []
    : newsData[newCategory];

  const renderNewsItems = (articles) => {
    if (!articles || articles.length === 0) {
      return <p>No news available</p>;
    }

    return articles.map((article, index) => (
      <div
        key={index}
        className="border border-gray-200 p-4 rounded-lg shadow-md"
      >
        <a href={article.url}>
          <h2 className="mb-2.5 text-xl font-bold lg:text-2xl text-[#292219] hover:text-[#00D991] transition-colors duration-300">
            {article.title}
          </h2>
        </a>
        <p className="text-base text-[#292219]">{article.description}</p>
        <p className="mt-5 text-base text-[#94908C]">
          Published on:{" "}
          {article.publishedAt
            ? new Date(article.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "Unknown"}
        </p>
        {article.urlToImage ? (
          <img
            className="w-full"
            src={article.urlToImage}
            alt={article.title || "News thumbnail"}
          />
        ) : article.url ? (
          <div>
            <video className="w-full" controls>
              <source src={article.url} type="video/mp4" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {renderNewsItems(articlesToDisplay)}
        </div>
      </div>
    </main>
  );
};

export default NewsBoard;
