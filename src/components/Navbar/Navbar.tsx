import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { icons } from "../../assets/icons";
import CryptoSearchbar from "../CryptoSearchbar/CryptoSearchbar";
import DarkMode from "../DarkMode/DarkMode";
import NavbarOverlay from "../NavbarOverlay/NavbarOverlay";
import { Percent } from "../Percent";
import "./Navbar.scss";
import logo from "/images/logo.png";

export default function Navbar({ globalData, cryptoList }: any) {
  const overlayRef: any = useRef(null);

  const activateOverlay = () => {
    if (overlayRef.current) {
      overlayRef.current.toggleOverlay();
    }
  };

  const repoUrl = "https://github.com/mrmendoza171/cryptotracker";

  return (
    <div className="Navbar">
      <NavbarOverlay ref={overlayRef} />

      <div className="sub-header">
        <div className="header-crypto">
          <div className="header-stat">
            <p>Coins:</p>
            <Link className="header-stat-link" to="/">
              {Number(globalData.active_cryptocurrencies).toLocaleString()}
            </Link>
          </div>

          <div className="header-stat">
            <p>Exchanges:</p>
            <Link className="header-stat-link" to="/">
              {Number(globalData.markets).toLocaleString()}
            </Link>
          </div>

          <div className="header-stat">
            <p>Market Cap:</p>
            <Link className="header-stat-link" to="/">
              <div className="market-change">
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

          <div className="header-stat">
            <p>24h Vol:</p>
            <Link className="header-stat-link" to="/">
              $
              {Number(globalData.total_volume.usd).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </Link>
          </div>

          <div className="header-stat">
            <p>Dominance:</p>
            <Link className="header-stat-link" to="/">
              <div className="flex">
                <p className="inline">
                  BTC {globalData.market_cap_percentage.btc.toFixed(1)}%
                </p>
                <p className="inline">
                  ETH {globalData.market_cap_percentage.eth.toFixed(1)}%
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div className="header-control">
          <select className="nav-select">
            <option>English</option>
          </select>
          <select className="nav-select">
            <option>USD</option>
          </select>
          {/* <CurrencySelector /> */}
          <div className="nav-icons">
            <DarkMode />
            <a href={repoUrl} target="_blank" rel="noopener">
              <FontAwesomeIcon
                title="Search"
                icon={icons.faGithub}
                className="nav-icon"
              />
            </a>
            <button className="nav-icon">
              <FontAwesomeIcon icon={icons.faBell} />
            </button>
            <button className="nav-icon">
              <FontAwesomeIcon icon={icons.faUser} />
            </button>
          </div>
        </div>
      </div>

      <div className="main-header">
        <div className="header-links">
          <a className="header-title flex nav-link" href="/">
            <img src={logo} />
            <p>CryptoTracker</p>
          </a>
          <div className="nav-list">
            <div className="nav-item">
              <Link className="nav-link" to="/">
                Cryptocurrencies
              </Link>
            </div>
            <div className="nav-item">
              <Link className="nav-link" to="/portfolio">
                Portfolio
              </Link>
            </div>
            <div className="nav-item">
              <Link className="nav-link" to="/widgets">
                Widgets
              </Link>
            </div>
          </div>
        </div>

        <div className="header-control-small">
          <button className="icon-div">
            <FontAwesomeIcon icon={icons.faMagnifyingGlass} />
          </button>
          <div className="icon-div">
            <DarkMode />
          </div>
          <a href={repoUrl} target="_blank" rel="noopener" className="icon-div">
            <FontAwesomeIcon title="Search" icon={icons.faGithub} />
          </a>
          <button className="icon-div">
            <FontAwesomeIcon icon={icons.faBell} />
          </button>
          <button className="icon-div" onClick={activateOverlay}>
            <FontAwesomeIcon icon={icons.faBars} />
          </button>
        </div>
        <CryptoSearchbar className="nav-search" data={cryptoList} />
      </div>
    </div>
  );
}
