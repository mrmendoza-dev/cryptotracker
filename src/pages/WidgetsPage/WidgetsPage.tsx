import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./WidgetsPage.css";
import Converter from "../../components/widgets/Converter/Converter";
import CryptoCard from "../../components/widgets/CryptoCard/CryptoCard";
import Dominance from "../../components/widgets/Dominance/Dominance";
import EthGasTracker from "../../components/widgets/EthGasTracker/EthGasTracker";
import FearGreed from "../../components/widgets/FearGreed/FearGreed";
import Scroller from "../../components/widgets/Scroller/Scroller";
import Trending from "../../components/widgets/Trending/Trending";


export default function WidgetsPage(props: any) {
  const cryptos = props.cryptos;
  const globalData = props.globalData;
  const trending = props.trending;

  return (
    <div className="Widgets">
      <Scroller cryptos={cryptos} />
      <div className="crypto-cards">
        {cryptos.slice(0, 5).map((crypto: any) => {
          return <CryptoCard crypto={crypto} key={nanoid()} />;
        })}
      </div>

      <div className="widget-row">
        <FearGreed />
        <EthGasTracker />
      </div>
      <div className="widget-row">
        <Dominance cryptos={globalData.market_cap_percentage} />
        <Trending cryptos={trending} />
      </div>
      {/* <div className="widget-row">
      <CryptoList cryptos={cryptos.slice(0,10)} />
    </div> */}
      <Converter cryptos={cryptos} />
    </div>
  );
}
