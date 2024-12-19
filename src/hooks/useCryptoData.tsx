import defaultCryptoData from "@/data/cryptoData.json";
import defaultGlobalData from "@/data/globalData.json";
import defaultTrendingData from "@/data/trendingData.json";
import defaultCryptoListData from "@/data/cryptoListData.json";

import axios from "axios";
import { useEffect, useState } from "react";

export function useCryptoData() {
  const [cryptos, setCryptos] = useState(defaultCryptoData);
  const [globalData, setGlobalData] = useState(defaultGlobalData.data);
  const [trendingData, setTrendingData] = useState(defaultTrendingData.coins);
  const [cryptoList, setCryptoList] = useState(defaultCryptoListData);

  const baseUrl = "https://api.coingecko.com/api/v3/";
  const headers = {
    accept: "application/json",
    "x-cg-demo-api-key": import.meta.env.VITE_COINGECKO_DEMO_API_KEY,
  };

  function loadDefault() {
    setCryptos(defaultCryptoData);
    setGlobalData(defaultGlobalData.data);
    setTrendingData(defaultTrendingData.coins);
    setCryptoList(defaultCryptoListData);
  }

  function fetchCryptos(pageNum: number = 1) {
    const currency = "usd";
    const order = "market_cap_desc";
    const perPage = "100";
    const sparkline = "true";
    const pricePercentage = "1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y";
    const cryptosUrl = `${baseUrl}coins/markets?vs_currency=${currency}&order=${order}&per_page=${perPage}&page=${pageNum}&sparkline=${sparkline}&price_change_percentage=${pricePercentage}`;

    axios
      .get(cryptosUrl, { headers  })
      .then((response: any) => {
        setCryptos(response.data);
      })
      .catch((error: any) => {
        console.error("Error fetching cryptos data: ", error);
      });
  }

  function fetchGlobalData() {
    const globalUrl = `${baseUrl}global`;
    axios
      .get(globalUrl, { headers })
      .then((response: any) => {
        setGlobalData(response.data.data);
      })
      .catch((error: any) => {
        console.error("Error fetching global data: ", error);
      });
  }

  function fetchTrendingData() {
    const trendingUrl = `${baseUrl}search/trending`;

    axios
      .get(trendingUrl, { headers })
      .then((response: any) => {
        setTrendingData(response.data.coins);
      })
      .catch((error: any) => {
        console.error("Error fetching trending data: ", error);
      });
  }

  function getData() {
    fetchCryptos();
    fetchGlobalData();
    fetchTrendingData();
  }

  useEffect(() => {
    loadDefault();
    getData();
  }, []);

  return { cryptos, globalData, trendingData, cryptoList, fetchCryptos };
}
