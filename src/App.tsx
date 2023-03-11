import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import appData from "./hooks/appData";
import "./css/App.css";
// import "./css/Cryptos.css";
import {Routes, Route} from "react-router-dom"
import Cryptos from "./pages/CryptosPage/CryptosPage"
import Portfolio from "./pages/PortfolioPage/PortfolioPage";
import Widgets from "./pages/WidgetsPage/WidgetsPage";
import News from "./pages/NewsPage/NewsPage";


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
