import { faGithub, faBell, faUser, faMagnifyingGlass, faBars } from "@/assets/icons";
import { CryptoSearchbar } from "@/components/ui/CryptoSearchbar";
import { NavbarOverlay } from "@/components/ApplicationShell/NavbarOverlay";
import { Percent } from "@/components/ui/Percent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import logo from "/images/logo.png";

export const Nav = ({ globalData, cryptoList }: any) => {
  const overlayRef: any = useRef(null);

  return (
    <nav className="pt-4 flex flex-col top-0 z-10 w-full max-w-[1600px] mx-auto">
      <NavbarOverlay ref={overlayRef} />

      {/* Sub Header */}
      <div
        className="flex justify-between items-center px-8 pt-2 pb-4 flex-wrap text-sm font-semibold 
        border-b border-gray-100 dark:border-gray-700 order-0 xl:order-first"
      >
        {/* Crypto Stats */}
        <div className="flex items-center gap-5 whitespace-nowrap w-fit overflow-auto">
          <div className="flex gap-1.5">
            <p>Coins:</p>
            <Link className="text-blue-500" to="/">
              {Number(globalData.active_cryptocurrencies).toLocaleString()}
            </Link>
          </div>

          <div className="flex gap-1.5">
            <p>Exchanges:</p>
            <Link className="text-blue-500" to="/">
              {Number(globalData.markets).toLocaleString()}
            </Link>
          </div>

          <div className="flex gap-1.5">
            <p>Market Cap:</p>
            <Link className="text-blue-500" to="/">
              <div className="flex gap-1.5">
                <p>
                  $
                  {globalData.total_market_cap.usd.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </p>
                <Percent
                  value={globalData.market_cap_change_percentage_24h_usd}
                />
              </div>
            </Link>
          </div>

          <div className="flex gap-1.5">
            <p>24h Vol:</p>
            <Link className="text-blue-500" to="/">
              $
              {Number(globalData.total_volume.usd).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </Link>
          </div>

          <div className="flex gap-1.5">
            <p>Dominance:</p>
            <Link className="text-blue-500" to="/">
              <div className="flex gap-2">
                <p>BTC {globalData.market_cap_percentage.btc.toFixed(1)}%</p>
                <p>ETH {globalData.market_cap_percentage.eth.toFixed(1)}%</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Controls */}
        <div className="hidden xl:flex items-center">
          <select
            className="py-1.5 px-2 text-sm outline-none border-none bg-transparent 
            text-gray-500 dark:text-gray-400 cursor-pointer rounded-lg
            hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <option>English</option>
          </select>
          <select
            className="py-1.5 px-2 text-sm outline-none border-none bg-transparent 
            text-gray-500 dark:text-gray-400 cursor-pointer rounded-lg
            hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <option>USD</option>
          </select>

          <div className="flex items-center gap-1 ml-3">
            <ThemeToggle />

            <a
              href="https://github.com/mrmendoza171/cryptotracker"
              target="_blank"
              rel="noopener"
              className="flex items-center justify-center w-10 h-10 rounded-lg
          text-gray-500 dark:text-gray-400 
          hover:bg-gray-100 dark:hover:bg-gray-800
          focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700
          transition-colors"
            >
              <FontAwesomeIcon
                icon={faGithub}
                title="GitHub"
                className="text-xl"
              />
            </a>

            <button
              className="flex items-center justify-center w-10 h-10 rounded-lg
          text-gray-500 dark:text-gray-400 
          hover:bg-gray-100 dark:hover:bg-gray-800
          focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700
          transition-colors"
            >
              <FontAwesomeIcon icon={faBell} className="text-xl" />
            </button>

            <button
              className="flex items-center justify-center w-10 h-10 rounded-lg
          text-gray-500 dark:text-gray-400 
          hover:bg-gray-100 dark:hover:bg-gray-800
          focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700
          transition-colors"
            >
              <FontAwesomeIcon icon={faUser} className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div
        className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 
        py-2 px-8 order-first xl:order-1"
      >
        <div className="flex items-center">
          <Link className="flex items-center gap-1 select-none" to="/">
            <img src={logo} className="w-[30px] rounded-full" alt="Logo" />
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-[-2px]">
              CryptoTracker
            </p>
          </Link>

          <div className="hidden xl:flex gap-6 ml-8 text-base font-semibold">
            <div>
              <Link className="text-gray-900 dark:text-gray-100" to="/">
                Cryptocurrencies
              </Link>
            </div>
            <div>
              <Link
                className="text-gray-900 dark:text-gray-100"
                to="/portfolio"
              >
                Portfolio
              </Link>
            </div>
            <div>
              <Link className="text-gray-900 dark:text-gray-100" to="/widgets">
                Widgets
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex xl:hidden items-center gap-2 w-fit max-w-[200px] text-gray-500 dark:text-gray-400">
          <button
            className="flex items-center justify-center w-8 h-8 rounded-lg
    hover:bg-gray-100 dark:hover:bg-gray-800
    focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700
    transition-colors"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-lg" />
          </button>

          {/* ThemeToggle component with smaller size */}
          <div className="scale-[0.8] -m-1">
            <ThemeToggle />
          </div>

          <a
            href="https://github.com/mrmendoza171/cryptotracker"
            target="_blank"
            rel="noopener"
            className="flex items-center justify-center w-8 h-8 rounded-lg
      hover:bg-gray-100 dark:hover:bg-gray-800
      focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700
      transition-colors"
          >
            <FontAwesomeIcon icon={faGithub} className="text-lg" />
          </a>

          <button
            className="flex items-center justify-center w-8 h-8 rounded-lg
    hover:bg-gray-100 dark:hover:bg-gray-800
    focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700
    transition-colors"
          >
            <FontAwesomeIcon icon={faBell} className="text-lg" />
          </button>

          <button
            onClick={() => overlayRef.current?.toggleOverlay()}
            className="flex items-center justify-center w-8 h-8 rounded-lg
      hover:bg-gray-100 dark:hover:bg-gray-800
      focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700
      transition-colors"
          >
            <FontAwesomeIcon icon={faBars} className="text-lg" />
          </button>
        </div>

        {/* Desktop Search */}
        <div className="hidden xl:block">
          <CryptoSearchbar className="nav-search" data={cryptoList} />
        </div>
      </div>
    </nav>
  );
}
