import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./Trending.scss";

export default function Trending(props: any) {
  const trendingList = props.cryptos;
  return (
    <div className="Trending module">
      <p className="module-title">Trending</p>

      <table>
        <thead></thead>
        <tbody>
          {trendingList.map((crypto: any) => {
            return (
              <tr key={nanoid()} className="trending-row">
                <td>
                  <p className="trending-rank">{crypto.item.market_cap_rank}</p>
                </td>
                <td>
                  <img className="trending-logo" src={crypto.item.thumb} />
                </td>
                <td>
                  <a
                    href={`https://www.coingecko.com/en/coins/${crypto.item.id}`}
                    target="_blank"
                    rel="noopener"
                  >
                    <div className="trending-title">
                      <p className="trending-name">{crypto.item.name}</p>
                      <p className="trending-symbol">{crypto.item.symbol}</p>
                    </div>
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
