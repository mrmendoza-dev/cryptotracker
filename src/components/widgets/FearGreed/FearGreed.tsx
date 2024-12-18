import { useEffect, useState } from "react";

export default function FearGreed() {
  const [index, setIndex] = useState<{
    value: number;
    value_classification: string;
    timestamp: string;
  }>({
    value: 0,
    value_classification: "",
    timestamp: "",
  });
  const [history, setHistory] = useState([]);
  const limit = 10;
  const dataFormats = ["json", "csv"];
  const dateFormats = ["", "us", "cn", "kr", "world"];

  const url = `https://api.alternative.me/fng/?limit=${limit}&format=${dataFormats[0]}&date_format=${dateFormats[1]}`;

  function getApiData() {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setHistory(data.data);
        setIndex(data.data[0]);
      });
  }
  useEffect(getApiData, []);

  // Function to determine text color based on value
  const getColorClass = (value: number) => {
    if (value >= 80) return "text-[#4FBA1E]"; // Dark Green
    if (value >= 60) return "text-[#B7DD16]"; // Light Green
    if (value >= 40) return "text-[#FDD101]"; // Yellow
    if (value >= 20) return "text-[#FF8400]"; // Orange
    return "text-[#F02602]"; // Red
  };

  return (
    <div className="p-4 rounded-lg bg-white/10 dark:bg-red-500 backdrop-blur-sm">
      <p className="text-lg font-semibold mb-2">Crypto Fear/Greed</p>
      <p className={`text-3xl font-bold ${getColorClass(index.value)}`}>
        {index.value}
      </p>
      <p className="text-gray-300 mt-1">{index.value_classification}</p>

      <a
        href="https://alternative.me/crypto/fear-and-greed-index/"
        target="_blank"
        rel="noopener"
        className="block mt-2 text-sm text-gray-400 hover:text-gray-300 transition-colors"
      >
        Last Update: {index.timestamp}
      </a>
    </div>
  );
}
