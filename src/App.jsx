import "./App.css";
import Footer from "./components/footer/Footer";
import Logo from "./components/header/Logo";
import NewsBoard from "./components/news/NewsBoard";
import NewsProvider from "./provider/NewsProvider";
function App() {
  return (
    <NewsProvider>
      <Logo />
      <NewsBoard />
      <Footer />
    </NewsProvider>
  );
}

export default App;
