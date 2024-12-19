import { useEffect, useState, useRef } from "react";
import { Percent } from "@/components/ui/Percent";
import { Private } from "@/components/ui/Private";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faCirclePlus,
  faCaretUp,
  faEyeSlash,
  faEye,
  faEllipsis,
  faPlus,
  faCaretDown,
  faEllipsisVertical,
} from "@/assets/icons";
import useLocalStorage from "@/hooks/useLocalStorage";
import { DialogModal } from "@/components/ui/DialogModal";
import { ModalAddTransaction } from "@/components/Portfolio/ModalAddTransaction";
import { ModalEditTransaction } from "@/components/Portfolio/ModalEditTransaction";
import { ModalCreatePortfolio } from "@/components/Portfolio/ModalCreatePortfolio";
import { useCryptoData } from "@/hooks/useCryptoData";

export const PortfolioPage = () => {
  const { cryptos } = useCryptoData() as any;

  const [hidden, setHidden] = useLocalStorage("hidden", false);
  const [stats, setStats] = useState({
    total: 1235.67,
    percentChange: 48.25,
    amountChange: 12475.92,
    profit: { percent: 60.59, amount: 58935.36 },
    best: { percent: 0.97, amount: 36.06 },
    worst: { percent: 64.2, amount: 29082.71 },
  });

  const [holdingsData, setHoldingsData] = useLocalStorage("holdingsData", [
    {
      id: "bitcoin",
      name: "Bitcoin",
      quantity: 0.01,
      avgBuyPrice: 10000,
      profitLoss: 100,
    },
    {
      id: "dogecoin",
      name: "Dogecoin",
      quantity: 1000,
      avgBuyPrice: 0.01,
      profitLoss: 100,
    },
    {
      id: "ethereum",
      name: "Ethereum",
      quantity: 1,
      avgBuyPrice: 1000,
      profitLoss: 100,
    },
    {
      id: "litecoin",
      name: "Litecoin",
      quantity: 5,
      avgBuyPrice: 100,
      profitLoss: 100,
    },
  ]);

  const coingeckoUrl = "https://www.coingecko.com/en/coins/";

  function sortPortfolioHoldings(holdings: any) {
    let sortedHoldings = [...holdings];

    sortedHoldings.sort((a, b) => {
      const currentPriceA = cryptos.find(
        (crypto: any) => crypto.id === a.id
      ).current_price;
      const currentPriceB = cryptos.find(
        (crypto: any) => crypto.id === b.id
      ).current_price;

      const totalValueA = currentPriceA * a.quantity;
      const totalValueB = currentPriceB * b.quantity;

      return totalValueB - totalValueA;
    });

    return sortedHoldings;
  }

  function addPortfolioTransaction(
    crypto: any,
    quantity: number,
    pricePerCoin: number,
    txType: string
  ) {
    let updatedHoldings = [...holdingsData];
    let holding = updatedHoldings.find((x: any) => x.id === crypto);

    if (holding === undefined) {
      holding = {
        id: crypto,
        name: cryptos.find((x: any) => x.id === crypto).name,
        quantity: 0,
        avgBuyPrice: 0,
        profitLoss: 0,
      };
      updatedHoldings.push(holding);
    }

    function checkSufficientFunds() {
      if (Number(holding.quantity) - Number(quantity) < 0) {
        alert("Insufficient funds");
        return false;
      } else {
        return true;
      }
    }

    if (txType === "Buy") {
      holding.quantity = Number(holding.quantity) + Number(quantity);
    } else if (txType === "Sell" && checkSufficientFunds()) {
      holding.quantity = Number(holding.quantity) - Number(quantity);
    } else if (txType === "Transfer" && checkSufficientFunds()) {
      holding.quantity = Number(holding.quantity) - Number(quantity);
    }

    setHoldingsData(sortPortfolioHoldings(updatedHoldings));
  }

  function deletePortfolioTransactions(crypto: any) {
    setHoldingsData((prevHoldings: any) => {
      const updatedHoldings = [...prevHoldings];
      return updatedHoldings.filter((holding: any) => holding.id !== crypto);
    });
  }

  function hideBalance() {
    setHidden((prevState: any) => !prevState);
  }

  function getPortfolioProportion(cryptoHoldings: any) {
    let crypto = cryptos.find((x: any) => x.id === cryptoHoldings.id);
    let total = cryptoHoldings.quantity * crypto.current_price;
    return total / stats.total;
  }

  getPortfolioProportion(holdingsData[0]);

  useEffect(() => {
    setHoldingsData(sortPortfolioHoldings(holdingsData));
  }, []);

  useEffect(() => {
    calculateStats();
  }, [holdingsData]);

  let cryptoColors = [
    "#ED7D31",
    "#2E74B5",
    "#FFC000",
    "#FF3300",
    "#4472C4",
    "#70AD47",
    "#5B9BD5",
    "#9665A8",
    "#E36C09",
    "#A5A5A5",
  ];

  function calculateStats() {
    let total = 0;
    holdingsData.forEach((holding: any) => {
      const crypto = cryptos.find((x: any) => x.id === holding.id);
      total += crypto ? crypto.current_price * holding.quantity : 0;
    });
    setStats((prevStats) => {
      return { ...prevStats, total: total };
    });
  }

  useEffect(() => {
    calculateStats();
  }, [cryptos]);

  return (
    <div className="mx-auto flex gap-8 p-8 max-w-[95%] xl:max-w-[1200px]">
      {/* Sidebar */}
      <div className="hidden xl:flex flex-col w-1/5">
        <div className="sidebar-main">
          <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="rounded-full bg-blue-700 h-10 aspect-square flex items-center justify-center text-white text-base">
              <FontAwesomeIcon icon={faWallet} />
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="font-bold">All Portfolios</p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <Private
                  hidden={hidden}
                  element={
                    <p>
                      ≈$
                      {stats.total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar-portfolios">
          <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="rounded-full bg-blue-700 h-10 aspect-square flex items-center justify-center text-white text-base">
              <FontAwesomeIcon icon={faWallet} />
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="font-bold">Main Portfolio</p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <Private
                  hidden={hidden}
                  element={
                    <p>
                      ≈$
                      {stats.total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <DialogModal
            buttonLabel={
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faCirclePlus} />
                <p>Create portfolio</p>
              </div>
            }
            buttonClass="w-full text-gray-900 dark:text-gray-100 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800 p-3 rounded-lg transition-colors"
            elements={<ModalCreatePortfolio />}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Private
                hidden={hidden}
                element={
                  <p className="text-4xl font-bold">
                    $
                    {stats.total.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })}
                  </p>
                }
              />
              <div className="flex items-center text-white bg-emerald-500 font-bold rounded-lg px-3 py-1.5">
                <FontAwesomeIcon icon={faCaretUp} className="text-sm mr-1" />
                {stats.percentChange}%
              </div>
              <button
                onClick={hideBalance}
                className="text-gray-500 hover:text-gray-700 text-xl bg-transparent"
              >
                {hidden ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-emerald-500 font-bold">
                <Private
                  hidden={hidden}
                  element={
                    <p>
                      + $
                      {stats.amountChange.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  }
                />
              </div>
              <p className="text-gray-500 bg-gray-50 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm">
                24h
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <DialogModal
              buttonLabel={
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faEllipsis} />
                  <p>More</p>
                </div>
              }
              buttonClass="bg-gray-50 dark:bg-gray-800 text-gray-500 px-4 py-2 rounded-lg font-semibold text-sm"
              elements={ModalAddTransaction({ cryptos })}
            />
            <DialogModal
              buttonLabel={
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCirclePlus} />
                  <p>Add New</p>
                </div>
              }
              buttonClass="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-sm"
              elements={ModalAddTransaction({
                cryptos,
                addPortfolioTransaction,
              })}
            />
          </div>
        </div>

        {/* Chart Area */}
        <div className="portfolio-main-chart"></div>

        {/* Allocation */}
        <div className="w-[90%] mx-auto mt-8">
          <div className="border-8 border-gray-100 dark:border-gray-700 rounded-lg">
            <div className="flex">
              {holdingsData.map((holding: any, index: any) => {
                const percent = getPortfolioProportion(holding) * 100;
                return (
                  <div
                    key={nanoid()}
                    className="h-3 relative first:rounded-l-lg last:rounded-r-lg group"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: cryptoColors[index],
                    }}
                  >
                    <div className="hidden group-hover:block absolute top-0 left-0 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                      <p className="whitespace-nowrap">{holding.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col md:flex-row justify-start gap-9 mt-6">
          <div className="text-gray-500 dark:text-gray-400 flex items-center gap-3 text-sm font-bold">
            <p>All Time Profit</p>
            <div className="text-red-500">
              <Private
                hidden={hidden}
                element={
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      className="text-sm mr-1"
                    />
                    {stats.profit.percent}% ($
                    {stats.profit.amount.toLocaleString()})
                  </div>
                }
              />
            </div>
          </div>

          <div className="text-gray-500 dark:text-gray-400 flex items-center gap-3 text-sm font-bold">
            <p>Best Performer</p>
            <div className="text-red-500">
              <Private
                hidden={hidden}
                element={
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      className="text-sm mr-1"
                    />
                    {stats.best.percent}% (${stats.best.amount.toLocaleString()}
                    )
                  </div>
                }
              />
            </div>
          </div>

          <div className="text-gray-500 dark:text-gray-400 flex items-center gap-3 text-sm font-bold">
            <p>Worst Performer</p>
            <div className="text-red-500">
              <Private
                hidden={hidden}
                element={
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      className="text-sm mr-1"
                    />
                    {stats.worst.percent}% ($
                    {stats.worst.amount.toLocaleString()})
                  </div>
                }
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-8">
          <p className="text-xl mb-4">Your Assets</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="h-[4.2em] border-t border-b border-gray-100 dark:border-gray-700 text-sm sticky top-0 bg-white dark:bg-gray-900 z-10">
                  <th className="text-center">#</th>
                  <th className="text-left">Coin</th>
                  <th className="text-center">Price</th>
                  <th className="text-right">24h</th>
                  <th className="text-center">Holdings</th>
                  <th className="text-center">Avg. Buy Price</th>
                  <th className="text-center">Profit/Loss</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {holdingsData.map((held: any) => {
                  let crypto = cryptos.find((x: any) => x.id === held.id) || {
                    current_price: 0,
                    price_change_percentage_24h_in_currency: 0,
                    market_cap_rank: 0,
                    image: "",
                    name: "",
                    symbol: "",
                  };

                  return (
                    <tr
                      key={nanoid()}
                      className="h-[4.2em] border-b border-gray-100 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="text-center font-semibold">
                        {crypto.market_cap_rank}.
                      </td>

                      <td>
                        <a
                          href={`${coingeckoUrl}${crypto.id}`}
                          target="_blank"
                          rel="noopener"
                          className="flex items-center gap-3"
                        >
                          <img
                            className="rounded-full h-[30px] w-[30px]"
                            src={crypto.image}
                            alt={crypto.name}
                          />
                          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {crypto.name}
                          </p>
                          <p className="text-sm font-semibold uppercase">
                            {crypto.symbol}
                          </p>
                        </a>
                      </td>

                      <td className="text-right">
                        $
                        {crypto.current_price.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })}
                      </td>

                      <td className="text-right">
                        <Percent
                          value={crypto.price_change_percentage_24h_in_currency}
                        />
                      </td>

                      <td className="text-right">
                        <Private
                          hidden={hidden}
                          element={
                            <div className="flex flex-col items-end">
                              <p>
                                $
                                {(
                                  Number(held.quantity) * crypto.current_price
                                ).toLocaleString(undefined, {
                                  maximumFractionDigits: 2,
                                  minimumFractionDigits: 2,
                                })}
                              </p>
                              <p>
                                {held.quantity} {crypto.symbol.toUpperCase()}
                              </p>
                            </div>
                          }
                        />
                      </td>

                      <td className="text-right">
                        $
                        {crypto.current_price.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })}
                      </td>

                      <td className="text-right">
                        <Private
                          hidden={hidden}
                          element={
                            <div className="flex flex-col items-end">
                              <p>
                                $
                                {stats.total.toLocaleString(undefined, {
                                  maximumFractionDigits: 2,
                                  minimumFractionDigits: 2,
                                })}
                              </p>
                              <p>{stats.percentChange}%</p>
                            </div>
                          }
                        />
                      </td>

                      <td className="text-center">
                        <div className="flex justify-center items-center gap-2">
                          <DialogModal
                            buttonLabel={<FontAwesomeIcon icon={faPlus} />}
                            buttonClass="text-lg text-gray-500 hover:text-gray-700"
                            elements={
                              <ModalAddTransaction
                                cryptos={cryptos}
                                cryptoId={crypto.id}
                                addPortfolioTransaction={
                                  addPortfolioTransaction
                                }
                              />
                            }
                          />

                          <DialogModal
                            buttonLabel={
                              <FontAwesomeIcon icon={faEllipsisVertical} />
                            }
                            buttonClass="text-lg text-gray-500 hover:text-gray-700"
                            elements={
                              <ModalEditTransaction
                                deletePortfolioTransactions={
                                  deletePortfolioTransactions
                                }
                                cryptoId={crypto.id}
                              />
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
