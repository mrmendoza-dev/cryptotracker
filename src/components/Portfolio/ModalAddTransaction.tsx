import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";

export function ModalAddTransaction({
  cryptos,
  cryptoId,
  addPortfolioTransaction,
  closeDialog,
}: any) {
  const [totalCost, setTotalCost] = useState(0);
  const [selectedCrypto, setSelectedCrypto] = useState(initializeCrypto);
  const [quantityInput, setQuantityInput] = useState("");
  const [pricePerCoin, setPricePerCoin] = useState(0);

  const txTypes = ["Buy", "Sell", "Transfer"];
  const [txType, setTxType] = useState(txTypes[0]);

  const quantityRef: any = useRef(null);

  function initializeCrypto() {
    if (cryptos.length > 0 && cryptoId) {
      return cryptos.find((x: any) => x.id === cryptoId);
    } else {
      return cryptos[0];
    }
  }

  function addTransaction() {
    addPortfolioTransaction(
      selectedCrypto.id,
      quantityInput,
      pricePerCoin,
      txType
    );
    setQuantityInput("");
    setSelectedCrypto(cryptos[0]);
  }

  useEffect(() => {
    setQuantityInput("");
    if (quantityRef.current) {
      quantityRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setTotalCost(Number(quantityInput) * pricePerCoin);
  }, [quantityInput, pricePerCoin]);

  useEffect(() => {
    setPricePerCoin(selectedCrypto.current_price);
  }, [selectedCrypto]);

  return (
    <div className="flex flex-col gap-6 p-6 w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Add Transaction
        </h2>
      </div>

      {/* Transaction Type Tabs */}
      <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        {txTypes.map((tab) => (
          <button
            key={nanoid()}
            className={`
              flex-1 py-2.5 px-4 rounded-md text-sm font-semibold transition-colors
              ${
                tab === txType
                  ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }
            `}
            onClick={() => setTxType(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Crypto Select */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Select Cryptocurrency
        </label>
        <select
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 
            bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-colors"
          value={selectedCrypto.id}
          onChange={(e) => {
            setSelectedCrypto(cryptos.find((x: any) => x.id === e.target.value));
          }}
        >
          {cryptos.map((crypto: any) => (
            <option key={nanoid()} value={crypto.id}>
              {crypto.name}
            </option>
          ))}
        </select>
      </div>

      {/* Transaction Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Quantity
          </label>
          <input
            type="number"
            value={quantityInput}
            onChange={(e) => setQuantityInput(e.target.value)}
            min={0}
            ref={quantityRef}
            className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 
              bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            $ Price Per Coin
          </label>
          <input
            type="number"
            value={pricePerCoin}
            onChange={(e) => setPricePerCoin(Number(e.target.value))}
            min={0}
            className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 
              bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-colors"
          />
        </div>
      </div>

      {/* Transaction Total */}
      {txType !== "Transfer" && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {txType === "Buy" ? "Total Spent" : "Total Received"}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            ${" "}
            {totalCost.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={addTransaction}
        className="mt-2 w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700
          text-white font-semibold py-3 px-4 rounded-lg transition-colors
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Transaction
      </button>
    </div>
  );
}

ModalAddTransaction.defaultProps = {
  closeDialog: () => {},
  cryptoId: "bitcoin",
};
