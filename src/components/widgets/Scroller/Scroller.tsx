import { nanoid } from "nanoid";
import "@/styles/variables.scss";
import "./Scroller.scss";
import { Percent } from "../../Percent";



export default function Scroller(props: any) {
  const cgUrl = "https://www.coingecko.com/en/coins/";
  const currencies = [
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

  let cryptoData = props.cryptos.filter((crypto: any) => {
    return currencies.includes(crypto.id);
  });

  return (
    <div className="Scroller">
      <div className="marquee">
        {cryptoData.map((crypto: any) => {
          return (
            <div className="ticker-cell" key={nanoid()}>
              <img className="crypto-img" src={crypto.image} />

              <a href={`${cgUrl}${crypto.id}`} target="_blank" rel="noopener">
                <div className="">
                  <p className="crypto-name">{crypto.name}</p>
                  <p className="crypto-symbol">{crypto.symbol}</p>
                </div>
              </a>

              <div className="price-data">
                <p className="crypto-price">${crypto.current_price}</p>
                <Percent
                  value={crypto.price_change_percentage_24h_in_currency}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
