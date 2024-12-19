import { Nav } from "@/components/ApplicationShell/Nav";
import { Footer } from "@/components/ApplicationShell/Footer";
import { useCryptoData } from "@/hooks/useCryptoData";
import { CryptosPage } from "@/pages/CryptosPage";
import { PortfolioPage } from "@/pages/PortfolioPage";
import { WidgetsPage } from "@/pages/WidgetsPage";
import { Route, Routes } from "react-router-dom";

function ApplicationShell() {
  const { cryptos, globalData, trendingData, cryptoList } = useCryptoData();

  return (
    <div className="ApplicationShell bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Nav />

      <Routes>
        <Route path="/" element={<CryptosPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/widgets" element={<WidgetsPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default ApplicationShell;
