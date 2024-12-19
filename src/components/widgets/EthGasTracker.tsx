import { useEffect, useState } from "react";

type GasOracle = {
  FastGasPrice: string;
  ProposeGasPrice: string;
  SafeGasPrice: string;
  LastBlock: string;
  suggestBaseFee: string;
  gasUsedRatio: string;
};

export const EthGasTracker = () => {
  const [oracle, setOracle] = useState<GasOracle>({
    FastGasPrice: "",
    ProposeGasPrice: "",
    SafeGasPrice: "",
    LastBlock: "",
    suggestBaseFee: "",
    gasUsedRatio: "",
  });

  const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;
  const url = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`;

  useEffect(() => {
    const getCryptoData = () => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setOracle(data.result);
        });
    };

    getCryptoData();
  }, []);

  const gasTiers = [
    { speed: "Fast", price: oracle.FastGasPrice },
    { speed: "Standard", price: oracle.ProposeGasPrice },
    { speed: "Safe", price: oracle.SafeGasPrice },
  ];

  return (
    <div className="max-w-[300px] p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
      <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
        ETH Gas Tracker
      </h2>

      <div className="space-y-2">
        {gasTiers.map(({ speed, price }) => (
          <div key={speed} className="flex justify-between text-lg">
            <span className="text-gray-500 dark:text-gray-400">{speed}</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium">
              {Number(price).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        ))}
      </div>

      <a
        href={`https://etherscan.io/block/${oracle.LastBlock}`}
        target="_blank"
        rel="noopener"
        className="block text-right mt-2.5 text-blue-600 dark:text-blue-400 hover:underline"
      >
        Last Block: {Number(oracle.LastBlock).toLocaleString()}
      </a>
    </div>
  );
}
