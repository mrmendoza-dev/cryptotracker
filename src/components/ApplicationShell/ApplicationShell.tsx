import { Nav } from "@/components/ApplicationShell/Nav";
import { Footer } from "@/components/ApplicationShell/Footer";
import { useCryptoData } from "@/hooks/useCryptoData";
import { CryptosPage } from "@/pages/CryptosPage";
import { PortfolioPage } from "@/pages/PortfolioPage";
import { WidgetsPage } from "@/pages/WidgetsPage";
import { Route, Routes } from "react-router-dom";

function ApplicationShell() {
  const { cryptos, globalData, trending, cryptoList } = useCryptoData();

  return (
    <div className="ApplicationShell bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Nav globalData={globalData} cryptoList={cryptoList} />

      <Routes>
        <Route path="/" element={<CryptosPage cryptos={cryptos} />} />
        <Route
          path="/portfolio"
          element={<PortfolioPage cryptos={cryptos} />}
        />
        <Route
          path="/widgets"
          element={
            <WidgetsPage
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

export default ApplicationShell;
