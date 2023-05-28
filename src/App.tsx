import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import "./styles/App.scss";
import "./styles/crypto-table.scss";

import { Route, Routes } from "react-router-dom";
import appData from "./hooks/appData";
import Cryptos from "./pages/CryptosPage/CryptosPage";
import News from "./pages/NewsPage/NewsPage";
import Portfolio from "./pages/PortfolioPage/PortfolioPage";
import Widgets from "./pages/WidgetsPage/WidgetsPage";

function App() {
  const { cryptos, globalData, trending, news, cryptoList } = appData();

  return (
    <div className="App">
      <Navbar globalData={globalData} cryptoList={cryptoList} />

      <Routes>
        <Route path="/" element={<Cryptos cryptos={cryptos} />} />
        <Route path="/portfolio" element={<Portfolio cryptos={cryptos} />} />
        <Route path="/news" element={<News news={news} />} />
        <Route
          path="/widgets"
          element={
            <Widgets
              cryptos={cryptos}
              globalData={globalData}
              trending={trending}
            />
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
