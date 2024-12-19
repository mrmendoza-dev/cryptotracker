import { nanoid } from "nanoid";
import { CryptoCard } from "@/components/widgets/CryptoCard";
import { Dominance } from "@/components/widgets/Dominance";
import { EthGasTracker } from "@/components/widgets/EthGasTracker";
import { FearGreed } from "@/components/widgets/FearGreed";
import { Scroller } from "@/components/widgets/Scroller";
import { Trending } from "@/components/widgets/Trending";

interface WidgetsPageProps {
  cryptos: any[];
  globalData: {
    market_cap_percentage: any;
  };
  trending: any;
}

export const WidgetsPage = ({ cryptos, globalData, trending }: WidgetsPageProps) => {
  return (
    <div className="w-[100%] mx-auto px-4">
      <Scroller cryptos={cryptos} />

      <div className="flex flex-col gap-4 p-4">
        <div className="flex justify-center flex-wrap gap-4">
          {cryptos.slice(0, 5).map((crypto: any) => (
            <CryptoCard crypto={crypto} key={nanoid()} />
          ))}
        </div>

        <div className="flex justify-center flex-wrap gap-4">
          <FearGreed />
          <EthGasTracker />
        </div>

        <div className="flex justify-center flex-wrap gap-4">
          <Dominance cryptos={globalData.market_cap_percentage} />
          <Trending cryptos={trending} />
        </div>
      </div>
    </div>
  );
};

export default WidgetsPage;
