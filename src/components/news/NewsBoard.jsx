import ThumbnileOne from "../../assets/icons/thumb_lg.png";
import ThumbnileTwo from "../../assets/icons/thumb.png";
import useNewsQuery from "../../hooks/useNewsQuery";

const NewsBoard = () => {
  const { newsData, loading, error } = useNewsQuery();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const renderNewsItems = (category, thumb) => {
    return newsData[category]?.map((article, index) => (
      <div key={index} className="col-span-12 md:col-span-6 lg:col-span-4">
        <div className="col-span-12">
          <a href={article.url}>
            <h3 className="mb-2.5 text-xl font-bold lg:text-2xl">
              {article.title}
            </h3>
          </a>
          <p className="text-base text-[#292219]">{article.description}</p>
          <p className="mt-5 text-base text-[#94908C]">
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>
        </div>
        {thumb && (
          <div className="col-span-12">
            <img className="w-full" src={thumb} alt="thumb" />
          </div>
        )}
      </div>
    ));
  };

  return (
    <>
      {/* main */}
      <main className="my-10 lg:my-14">
        <div className="container mx-auto grid grid-cols-12 gap-8">
          {/* left */}
          <div className="col-span-12 grid grid-cols-12 gap-6 self-start xl:col-span-8">
            {/* general news item */}
            <div className="col-span-12 grid grid-cols-12 gap-4">
              {/* info */}
              <div className="col-span-12 lg:col-span-4">
                <a href={newsData.general?.[0]?.url}>
                  <h3 className="mb-2.5 text-2xl font-bold lg:text-[28px]">
                    {newsData.general?.[0]?.title || 'No title'}
                  </h3>
                </a>
                <p className="text-base text-[#5C5955]">
                  {newsData.general?.[0]?.description || 'No description'}
                </p>
                <p className="mt-5 text-base text-[#5C5955]">
                  {newsData.general?.[0] && new Date(newsData.general[0].publishedAt).toLocaleDateString()}
                </p>
              </div>
              {/* thumb */}
              <div className="col-span-12 lg:col-span-8">
                <img className="w-full" src={ThumbnileOne} alt="thumb" />
                <p className="mt-5 text-base text-[#5C5955]">
                  Illustration: Karolis Strautniekas
                </p>
              </div>
            </div>
            {/* news item ends */}

            {/* Other news categories */}
            {renderNewsItems('business', ThumbnileTwo)}
            {renderNewsItems('entertainment', ThumbnileTwo)}
            {renderNewsItems('health', ThumbnileTwo)}
            {renderNewsItems('science', ThumbnileTwo)}
            {renderNewsItems('sports', ThumbnileTwo)}
            {renderNewsItems('technology', ThumbnileTwo)}
          </div>

          {/* right */}
          <div className="col-span-12 self-start xl:col-span-4">
            <div className="space-y-6 divide-y-2 divide-[#D5D1C9]">
              {/* additional news items */}
              {renderNewsItems('general', ThumbnileTwo)}
            </div>
          </div>
        </div>
      </main>
      {/* main ends */}
    </>
  );
};

export default NewsBoard;
