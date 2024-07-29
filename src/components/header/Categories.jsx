import { useContext, useState } from "react";
import { NewsContext } from "../../context";

const Categories = () => {
  const { setCategory } = useContext(NewsContext);
  const [activeCategory, setActiveCategory] = useState("all");

  const handleNewsMenu = (newCategory) => {
    setCategory(newCategory);
    setActiveCategory(newCategory);
  };

  const categories = [
    { id: "all", name: "All" },
    { id: "general", name: "General" },
    { id: "business", name: "Business" },
    { id: "entertainment", name: "Entertainment" },
    { id: "health", name: "Health" },
    { id: "science", name: "Science" },
    { id: "sports", name: "Sports" },
    { id: "technology", name: "Technology" },
  ];

  return (
    <div className="container mx-auto mt-6">
      <ul className="flex flex-wrap items-center justify-center gap-5 text-xs font-semibold lg:text-base cursor-pointer">
        {categories.map((category) => (
          <li key={category.id}>
            <p
              onClick={() => handleNewsMenu(category.id)}
              className={`px-3 py-2 rounded ${
                activeCategory === category.id
                  ? "bg-[#00D991] text-white"
                  : "text-black hover:bg-gray-300"
              }`}
            >
              {category.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
