

import { useEffect, useState } from "react";
import "../css/index.css";
import DarkMode from "./DarkMode";


export default function Header(props: any) {

  const globalData = props.globalData;
  console.log(globalData);


  
      // console.log(props.globalData.data.active_cryptocurrencies);

  return (
    <div className="Header">
      <p className="header-title">CryptoTracker</p>
      {/* <p>Coins: {globalData.active_cryptocurrencies}</p>
      <p>Exchanges: {globalData.markets}</p> */}
      {/* <p>Market Cap: {globalData.total_market_cap.usd}</p> */}
      {/* <p>24h Vol: {globalData.total_volume.usd}</p> */}
      {/* <div className="crypto-dominance">
        <p>Dominance:</p>
        <p>BTC {globalData.market_cap_percentage.btc}%</p>
        <p>ETH {globalData.market_cap_percentage.eth}%</p>
      </div> */}
      {/* <p>Gas: {globalData.active_cryptocurrencies}</p> */}
      <DarkMode />
    </div>
  );
}
