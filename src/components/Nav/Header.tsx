import styled from "styled-components";
import logo from "./logo.png";
import "./Nav.css";
import DarkMode from "./DarkMode";

const Percent = styled.p<{ data: number }>`
  color: ${(props: any) =>
    props.data === 0
      ? "var(--clr-fontAccent)"
      : props.data > 0
      ? "var(--clr-gain)"
      : "var(--clr-loss)"};
`;

export default function Header(props: any) {
  let globalData = props.globalData;
  const repoUrl = "https://github.com/mrmendoza171/cryptotracker";

  return (
    <div className="Header">
      <div className="main-header">
        <a href="/">
          <div className="header-title">
            <img src={logo} />
            <p>CryptoTracker</p>
          </div>
        </a>
        <div className="nav-icons">
          <a className="nav-icon" href={repoUrl} target="_blank">
            <i className="fa-brands fa-github"></i>
          </a>
          <DarkMode />
        </div>
      </div>

      <div className="sub-header">
        <p>
          Coins: {Number(globalData.active_cryptocurrencies).toLocaleString()}
        </p>
        <p>Exchanges: {globalData.markets.toLocaleString()}</p>
        <div className="market-change">
          <p>
            Market Cap: $
            {globalData.total_market_cap.usd.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
          <Percent data={globalData.market_cap_change_percentage_24h_usd}>
            {globalData.market_cap_change_percentage_24h_usd.toFixed(2)}%
            {globalData.market_cap_change_percentage_24h_usd > 0 ? (
              <i className="fa-solid fa-caret-up"></i>
            ) : (
              <i className="fa-solid fa-caret-down"></i>
            )}
          </Percent>
        </div>

        <p>
          24h Vol: $
          {Number(globalData.total_volume.usd).toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </p>
        <div className="crypto-dominance">
          <p>Dominance:</p>
          <p>BTC {globalData.market_cap_percentage.btc.toFixed(1)}%</p>
          <p>ETH {globalData.market_cap_percentage.eth.toFixed(1)}%</p>
        </div>
      </div>
      {/* <p>Gas: {globalData.active_cryptocurrencies}</p> */}
    </div>
  );
}
