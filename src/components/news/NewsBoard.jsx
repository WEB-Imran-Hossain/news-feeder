import ThumbnileOne from "../../assets/icons/thumb_lg.png";
import { useContext } from "react";
import { NewsContext } from "../../context";

const NewsBoard = () => {
  const { newsData, loading, error, newCategory } = useContext(NewsContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const renderNewsItems = (category, ThumbnileOne) => {
    if (!newsData[category] || newsData[category].length === 0) {
      return <p>No news available for {category}</p>;
    }

    return newsData[category]?.map((article, index) => (
      <div key={index}>
        <div>
          {/* news title */}
          <a href={article.url}>
            <h2 className="mb-2.5 text-xl font-bold lg:text-2xl text-[#292219] hover:text-[#00D991] transition-colors duration-300 ">
              {article.title}
            </h2>
          </a>

          {/* news description */}
          <p className="text-base text-[#292219]">{article.description}</p>

          {/* news publish date */}
          <p className="mt-5 text-base text-[#94908C]">
            Published on:{" "}
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        {/* news image */}
        {article.urlToImage ? (
          <img className="w-full" src={article.urlToImage} alt="thumb" />
        ) : article.url ? (
          // video
          <div>
            <video className="w-full" controls>
              <source src={article.url} type="video/mp4" />
            </video>
          </div>
        ) : (
          //default image
          <img className="w-full" src={ThumbnileOne} alt="default thumb" />
        )}
      </div>
    ));
  };

  return (
    <>
      {/* main */}
      <main className="my-10 lg:my-14">
        <div className="w-[80%] mx-auto">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {renderNewsItems(newCategory, ThumbnileOne)}
            </div>
          </div>
        </div>
      </main>
      {/* main ends */}
    </>
  );
};

export default NewsBoard;
