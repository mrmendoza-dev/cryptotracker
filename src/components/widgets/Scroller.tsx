import { Percent } from "@/components/ui/Percent";

type CryptoData = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h_in_currency: number;
};

const COINGECKO_URL = "https://www.coingecko.com/en/coins/";
const CURRENCIES = [
  "bitcoin",
  "ethereum",
  "binancecoin",
  "ripple",
  "cardano",
  "solana",
  "polkadot",
  "dogecoin",
  "litecoin",
];

export const Scroller = ({ cryptos }: { cryptos: CryptoData[] }) => {
  const cryptoData = cryptos.filter((crypto) => CURRENCIES.includes(crypto.id));

  return (
    <div className="w-full bg-white dark:bg-gray-800 py-1 border-t border-b border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="animate-marquee hover:pause-animation flex whitespace-nowrap">
        {[...cryptoData, ...cryptoData].map((crypto, index) => (
          <a
            key={`${crypto.id}-${index}`}
            href={`${COINGECKO_URL}${crypto.id}`}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center min-w-64 max-w-80 px-6 border-x border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors shrink-0"
          >
            <img
              src={crypto.image}
              alt={crypto.name}
              className="w-8 h-8 object-contain flex-shrink-0"
            />

            <div className="ml-4 min-w-0">
              <p className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                {crypto.name}
              </p>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
                {crypto.symbol}
              </p>
            </div>

            <div className="ml-auto pl-4 text-right flex-shrink-0">
              <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
                $
                {crypto.current_price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <Percent value={crypto.price_change_percentage_24h_in_currency} />
            </div>
          </a>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        .pause-animation {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
