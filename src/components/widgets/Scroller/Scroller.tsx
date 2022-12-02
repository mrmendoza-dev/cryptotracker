
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import "./index.css"
import styled from "styled-components";


const Percent = styled.p<{ data: number }>`
  color: ${(props: any) =>
    props.data >= 0
      ? "var(--clr-gain)"
      : "var(--clr-loss)"};
`;


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

  let cryptoData = props.cryptos.filter((crypto: any)=> {
      return currencies.includes(crypto.id);
  })

  return (
    <div className="Scroller">
      <div className="marquee">
        {cryptoData.map((crypto: any) => {
          return (
            <div className="ticker-cell" key={nanoid()}>
              <img className="crypto-img" src={crypto.image} />

              <a href={`${cgUrl}${crypto.id}`} target="_blank">
                <div className="">
                  <p className="crypto-name">{crypto.name}</p>
                  <p className="crypto-symbol">{crypto.symbol}</p>
                </div>
              </a>

              <div className="price-data">
                <p className="crypto-price">${crypto.current_price}</p>
                <Percent
                  className="crypto-change"
                  data={crypto.market_cap_change_percentage_24h}
                >
                  {crypto.market_cap_change_percentage_24h.toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 2,
                    }
                  )}
                  %
                </Percent>
              </div>
            </div>
          );
        })}
        
      </div>
    </div>
  );
}
