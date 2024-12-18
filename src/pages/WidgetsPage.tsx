import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import CryptoCard from "@/components/widgets/CryptoCard/CryptoCard";
import Dominance from "@/components/widgets/Dominance/Dominance";
import EthGasTracker from "@/components/widgets/EthGasTracker/EthGasTracker";
import FearGreed from "@/components/widgets/FearGreed/FearGreed";
import Scroller from "@/components/widgets/Scroller/Scroller";
import Trending from "@/components/widgets/Trending/Trending";

interface WidgetsPageProps {
  cryptos: any[];
  globalData: {
    market_cap_percentage: any;
  };
  trending: any;
}

const WidgetsPage = ({ cryptos, globalData, trending }: WidgetsPageProps) => {
  return (
    <div className="w-[90%] mx-auto px-4">
      <Scroller cryptos={cryptos} />

      <div className="flex justify-center flex-wrap gap-4 mt-8">
        {cryptos.slice(0, 5).map((crypto: any) => (
          <CryptoCard crypto={crypto} key={nanoid()} />
        ))}
      </div>

      <div className="flex justify-center flex-wrap gap-8 py-8 px-16">
        <FearGreed />
        <EthGasTracker />
      </div>

      <div className="flex justify-center flex-wrap gap-8 py-8 px-16">
        <Dominance cryptos={globalData.market_cap_percentage} />
        <Trending cryptos={trending} />
      </div>
    </div>
  );
};

export default WidgetsPage;
