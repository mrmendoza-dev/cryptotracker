
import { useState, useEffect, useRef } from "react";
import {
  defaultCryptoData,
  defaultGlobalData,
  defaultTrendingData,
  defaultNewsData,
} from "../data/defaultData";



function appData() {

  function handleChange(e: any) {
    const { value } = e.target;
  }

    const [cryptos, setCryptos] = useState([]);
    const [globalData, setGlobalData] = useState({
      active_cryptocurrencies: 0,
      markets: 0,
      market_cap_change_percentage_24h_usd: 0,
      total_market_cap: { usd: 0 },
      total_volume: { usd: 0 },
      market_cap_percentage: { btc: 0, eth: 0 },
    });
  const [trending, setTrending] = useState([]);
  const [news, setNews] = useState([]);


    
  const coingeckoUrl = "https://www.coingecko.com/en/coins/";
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


    function loadDefault() {
      setCryptos(defaultCryptoData);
      setGlobalData(defaultGlobalData.data);
      setTrending(defaultTrendingData.coins);
      setNews(defaultNewsData);
    }



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
      fetch(trendingUrl)
        .then((res) => res.json())
        .then((data) => {
          setTrending(data.coins);
        });
    }

  
  useEffect(() => {
    loadDefault();
    getCryptoData();
  }, []);


    useEffect(() => {
      const interval = setInterval(() => {
        getCryptoData();
      }, 10000);
      return () => clearInterval(interval);
    }, []);





  return {cryptos, globalData, trending, news  };
}

export default appData;
