
import { useState, useEffect, useRef } from "react";
import {
  defaultCryptoData,
  defaultGlobalData,
  defaultTrendingData,
  defaultNewsData,
  defaultCryptoListData,
} from "../data/defaultData";



function appData() {

  function handleChange(e: any) {
    const { value } = e.target;
  }

    const [cryptos, setCryptos] = useState(defaultCryptoData);
    const [globalData, setGlobalData] = useState({
      active_cryptocurrencies: 0,
      markets: 0,
      market_cap_change_percentage_24h_usd: 0,
      total_market_cap: { usd: 0 },
      total_volume: { usd: 0 },
      market_cap_percentage: { btc: 0, eth: 0 },
    });
  const [trending, setTrending] = useState(defaultTrendingData.coins);
  const [news, setNews] = useState(defaultNewsData);
  const [cryptoList, setCryptoList] = useState(defaultCryptoListData);


    
  const baseUrl = "https://api.coingecko.com/api/v3/";
  const currency = "usd";
  const order = "market_cap_desc";
  const pageNum = "1";
  const perPage = "100";
  const sparkline = "true";
  const pricePercentage = "1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y";


  const cryptosUrl = `${baseUrl}coins/markets?vs_currency=${currency}&order=${order}&per_page=${perPage}&page=${String(
    pageNum
  )}&sparkline=${sparkline}&price_change_percentage=${pricePercentage}`;
  const globalUrl = "https://api.coingecko.com/api/v3/global";
  const trendingUrl = "https://api.coingecko.com/api/v3/search/trending";
  const cryptoListUrl = `https://api.coingecko.com/api/v3/coins/list?include_platform=false`;


    function loadDefault() {
      setCryptos(defaultCryptoData);
      setGlobalData(defaultGlobalData.data);
      setTrending(defaultTrendingData.coins);
      setNews(defaultNewsData);
      setCryptoList(defaultCryptoListData);
    }


    function getCryptoData() {
      // fetch(cryptosUrl)
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setCryptos(data);
      //   });
      // fetch(globalUrl)
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setGlobalData(data.data);
      //   });
      // fetch(trendingUrl)
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setTrending(data.coins);
      //   });
      // fetch(trendingUrl)
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setTrending(data.coins);
      //   });
      return;
    }


// function getCryptoData() {
//   Promise.all([fetch(cryptosUrl), fetch(globalUrl), fetch(trendingUrl)])
//     .then((responses) => Promise.all(responses.map((res) => res.json())))
//     .then((data) => {
//       setCryptos(data[0]);
//       setGlobalData(data[1].data);
//       setTrending(data[2].coins);
//     })
//     .catch((error) => {
//       console.error("Error fetching data: ", error);
//     });
// }
  
  useEffect(() => {
    loadDefault();
    getCryptoData();
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      getCryptoData();
    }, 20000);
    return () => clearInterval(interval);
  }, []);







  return { cryptos, globalData, trending, news, cryptoList };
}

export default appData;
