import { useState, useEffect } from 'react'
import './css/App.css'
import {nanoid} from "nanoid"
import Header from './components/Header'


function App() {
  const [cryptos, setCryptos] = useState([])
  const [globalData, setGlobalData] = useState({});



  const coingeckoUrl = "https://www.coingecko.com/en/coins/";
  const baseUrl = "https://api.coingecko.com/api/v3/";
  const currency = "usd"
  const order = "market_cap_desc";
  const perPage = "250"
  const pageNum = "1"
  const sparkline = "true"
  const pricePercentage = "1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y";

  const cryptosUrl = `${baseUrl}coins/markets?vs_currency=${currency}&order=${order}&per_page=${perPage}&page=${pageNum}&sparkline=${sparkline}&price_change_percentage=${pricePercentage}`;
  const globalUrl = "https://api.coingecko.com/api/v3/global"


  function getCryptoData() {
    fetch(cryptosUrl)
      .then((res) => res.json())
      .then((data) => {
        setCryptos(data);
      });
    fetch(globalUrl)
      .then((res) => res.json())
      .then((data) => {
        setGlobalData(data.data);
      });
    }

  useEffect(getCryptoData, []);


  return (
    <div className="App">
      <Header global={globalData} />
      <div className="Cryptos">
        <table>
          <tr className="table-head">
            <th className="center">#</th>
            <th className="left">Coin</th>
            <th className="center">Price</th>
            <th className="center">1h</th>
            <th className="center">24h</th>
            <th className="center">7d</th>
            <th className="center">24h Volume</th>
            <th className="center">Market Cap</th>
            <th className="center">Sparkline</th>
          </tr>

          {cryptos.map((crypto: any) => (
            <tr key={nanoid()} className="crypto-row">
              <td className="flex">
                <div className="crypto-star">
                  <i className="fa-regular fa-star"></i>
                  {/* <i className="fa-solid fa-star"></i> */}
                </div>
                <p>{crypto.market_cap_rank}.</p>
              </td>

              <td>
                <a
                  href={`${coingeckoUrl}${crypto.id}`}
                  target="_blank"
                  rel="noopener"
                >
                  <div className="coin-data">
                    <img className="crypto-img" src={crypto.image} />
                    <p className="crypto-name">{crypto.name}</p>
                    <p className="crypto-symbol">{crypto.symbol}</p>
                  </div>
                </a>
              </td>

              <td>
                <p className="right">
                  ${crypto.current_price.toLocaleString(1)}
                </p>
              </td>

              <td>
                <p className="left">
                  {Number(
                    crypto.price_change_percentage_1h_in_currency
                  ).toFixed(1)}
                  %
                </p>
              </td>

              <td>
                <p className="left">
                  {Number(
                    crypto.price_change_percentage_24h_in_currency
                  ).toFixed(1)}
                  %
                </p>
              </td>

              <td>
                <p className="left">
                  {Number(
                    crypto.price_change_percentage_7d_in_currency
                  ).toFixed(1)}
                  %
                </p>
              </td>

              <td>
                <p className="right">${crypto.total_volume.toLocaleString()}</p>
              </td>

              <td>
                <p className="right">${crypto.market_cap.toLocaleString()}</p>
              </td>

              <td className="center">sparkline</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default App
