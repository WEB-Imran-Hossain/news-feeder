import Search from "./Search";
import LogoIcon from "../../assets/icons/logo.png";
import Categories from "./Categories";
import DateToTime from "./DateToTime";
const Logo = () => {
  return (
    <>
      {/* Navbar Starts */}
      <nav className="border-b border-black py-6 md:py-8">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-6">
          <DateToTime />
          {/* Logo */}
          <a href="/">
            <img
              className="max-w-[100px] md:max-w-[165px]"
              src={LogoIcon}
              alt="Lws"
            />
          </a>
          {/* Logo Ends */}

          <Search />
        </div>

        <Categories />
      </nav>
      {/* Navbar Ends */}
    </>
  );
};

export default Logo;
