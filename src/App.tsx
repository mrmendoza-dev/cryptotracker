import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import "@/styles/App.scss";
import "@/styles/crypto-table.scss";

import { Route, Routes } from "react-router-dom";
import { useCryptoData } from "@/hooks/useCryptoData";
import Cryptos from "@/pages/CryptosPage/CryptosPage";
import Portfolio from "@/pages/PortfolioPage/PortfolioPage";
import Widgets from "@/pages/WidgetsPage/WidgetsPage";

function App() {
  const { cryptos, globalData, trending, cryptoList } = useCryptoData();

  return (
    <div className="App">
      <Navbar globalData={globalData} cryptoList={cryptoList} />

      <Routes>
        <Route path="/" element={<Cryptos cryptos={cryptos} />} />
        <Route path="/portfolio" element={<Portfolio cryptos={cryptos} />} />
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
