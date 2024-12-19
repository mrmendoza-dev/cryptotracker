import { useEffect, useState } from "react";

type IndexData = {
  value: number;
  value_classification: string;
  timestamp: string;
};

export default function FearGreed() {
  const [index, setIndex] = useState<IndexData>({
    value: 0,
    value_classification: "",
    timestamp: "",
  });
  const [history, setHistory] = useState([]);

  const url =
    "https://api.alternative.me/fng/?limit=10&format=json&date_format=us";

  useEffect(() => {
    const getApiData = () => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setHistory(data.data);
          setIndex(data.data[0]);
        });
    };

    getApiData();
  }, []);

  const getColorClass = (value: number) => {
    if (value >= 80) return "text-[#4FBA1E]"; // Dark Green
    if (value >= 60) return "text-[#B7DD16]"; // Light Green
    if (value >= 40) return "text-[#FDD101]"; // Yellow
    if (value >= 20) return "text-[#FF8400]"; // Orange
    return "text-[#F02602]"; // Red
  };

  const formatDate = (timestamp: string) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-[300px] p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Crypto Fear & Greed
        </h2>

        <div className="flex flex-col items-center space-y-2">
          <p className={`text-5xl font-bold ${getColorClass(index.value)}`}>
            {index.value}
          </p>
          <p className="text-xl font-semibold text-gray-500 dark:text-gray-400">
            {index.value_classification}
          </p>
        </div>

        <a
          href="https://alternative.me/crypto/fear-and-greed-index/"
          target="_blank"
          rel="noopener"
          className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          Last Update: {formatDate(index.timestamp)}
        </a>
      </div>
    </div>
  );
}
