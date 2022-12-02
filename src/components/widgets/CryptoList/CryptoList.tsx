



import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./index.css";




export default function CryptoList(props: any) {
  const cryptos = props.cryptos;
  return (
    <div className="CryptoList module">
      <p className="module-title">CryptoList</p>

      <table>
        <thead></thead>
        <tbody>
          {cryptos.map((crypto: any) => {
            return (
              <tr key={nanoid()} className="trending-row">
                {/* <td>
                  <p className="trending-rank">{crypto.item.market_cap_rank}</p>
                </td>
                <td>
                  <img className="trending-logo" src={crypto.item.thumb} />
                </td>
                <td>
                  <a
                    href={`https://www.coingecko.com/en/coins/${crypto.item.id}`}
                    target="_blank"
                  >
                    <div className="trending-title">
                      <p className="trending-name">{crypto.item.name}</p>
                      <p className="trending-symbol">{crypto.item.symbol}</p>
                    </div>
                  </a>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
