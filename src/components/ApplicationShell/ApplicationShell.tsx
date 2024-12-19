// import Main from "@/components/ApplicationShell/Main";
// import Nav from "@/components/ApplicationShell/Nav";
// import Sidebar from "@/components/ApplicationShell/Sidebar";
import Nav from "@/components/ApplicationShell/Nav";
import Footer from "@/components/ApplicationShell/Footer";
import { useCryptoData } from "@/hooks/useCryptoData";
import Cryptos from "@/pages/CryptosPage";
import Portfolio from "@/pages/PortfolioPage";
import Widgets from "@/pages/WidgetsPage";
import "@/styles/App.scss";
import "@/styles/crypto-table.scss";
import { Route, Routes } from "react-router-dom";

function ApplicationShell() {
  const { cryptos, globalData, trending, cryptoList } = useCryptoData();

  return (
    <div className="ApplicationShell antialiased flex flex-col w-screen h-screen bg-gray-50 dark:bg-gray-900 text-white">
      <Nav globalData={globalData} cryptoList={cryptoList} />
      <div className="flex flex-1 h-full overflow-hidden">
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
      </div>
      <Footer />
    </div>
  );
}

export default ApplicationShell;
