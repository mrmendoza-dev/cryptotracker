import { useEffect, useState, useRef } from "react";
import "./PortfolioPage.scss";
import { Percent } from "../../components/Percent";
import Private from "../../components/Private";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../assets/icons";
import useLocalStorage from "../../hooks/useLocalStorage";
import DialogModal from "../../components/DialogModal/DialogModal";




export default function PortfolioPage({ cryptos }: any) {
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
    <div className="Portfolio">
      <div className="portfolio-sidebar">
        <div className="sidebar-main">
          <div className="portfolio-block">
            <div className="block-img">
              <FontAwesomeIcon icon={icons.faWallet} />
            </div>
            <div className="block-info">
              <p>
                <strong>All Portfolios</strong>
              </p>
              <div className="portfolio-block-total">
                <Private
                  hidden={hidden}
                  element={
                    <p className="">
                      ≈$
                      {stats.total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  }
                ></Private>
              </div>
            </div>
          </div>
        </div>
        <div className="sidebar-portfolios">
          <div className="portfolio-block">
            <div className="block-img">
              <FontAwesomeIcon icon={icons.faWallet} />
            </div>
            <div className="block-info">
              <p>
                <strong>Main Portfolio</strong>
              </p>

              <div className="portfolio-block-total">
                <Private
                  hidden={hidden}
                  element={
                    <p className="">
                      ≈$
                      {stats.total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  }
                ></Private>
              </div>
            </div>
          </div>
        </div>
        <div className="sidebar-controls">
          <DialogModal
            buttonLabel={
              <>
                <FontAwesomeIcon icon={icons.faCirclePlus} />
                <p>Create portfolio</p>
              </>
            }
            buttonClass="btn btn-sidebar"
            elements={<ModalCreatePortfolio />}
          />
        </div>
      </div>

      <div className="portfolio-main">
        <div className="portfolio-main-header">
          <div className="header-stats">
            <div className="header-balance">
              <Private
                hidden={hidden}
                element={
                  <p className="header-total">
                    $
                    {stats.total.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })}
                  </p>
                }
              ></Private>

              <div className="header-percent">
                <FontAwesomeIcon icon={icons.faCaretUp} className="caret" />
                {stats.percentChange}%
              </div>
              <button className="btn-hide" onClick={hideBalance}>
                {hidden ? (
                  <FontAwesomeIcon icon={icons.faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={icons.faEye} />
                )}
              </button>
            </div>

            <div className="header-change">
              <div className="change-amount">
                <Private
                  hidden={hidden}
                  element={
                    <p className="">
                      + $
                      {stats.amountChange.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  }
                ></Private>
              </div>

              <p className="change-timeframe">24h</p>
            </div>
          </div>

          <div className="header-controls">
            <DialogModal
              buttonLabel={
                <>
                  <FontAwesomeIcon icon={icons.faEllipsis} />
                  <p>More</p>
                </>
              }
              buttonClass="btn btn-more"
              elements={ModalAddTransaction({ cryptos })}
            />
            <DialogModal
              buttonLabel={
                <>
                  <FontAwesomeIcon icon={icons.faCirclePlus} />
                  <p>Add New</p>
                </>
              }
              buttonClass="btn btn-add"
              elements={ModalAddTransaction({
                cryptos,
                addPortfolioTransaction,
              })}
            />
          </div>
        </div>

        <div className="portfolio-main-chart"></div>

        <div className="portfolio-main-allocation">
          <div className="allocation-wrapper">
            <div className="allocation-bars">
              {holdingsData.map((holding: any, index: any) => {
                const percent = getPortfolioProportion(holding) * 100;

                return (
                  <div
                    className="allocation-bar"
                    style={{
                      width: percent + "%",
                      backgroundColor: cryptoColors[index],
                    }}
                    title={holding.name}
                    key={nanoid()}
                  >
                    <div className="crypto-info">
                      <p> {holding.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="portfolio-main-stats">
          <div className="portfolio-stat">
            <p>All Time Profit</p>
            <div className="stat-value">
              <Private
                hidden={hidden}
                element={
                  <div className="">
                    <FontAwesomeIcon
                      icon={icons.faCaretDown}
                      className="caret"
                    />
                    {stats.profit.percent}%($
                    {stats.profit.amount.toLocaleString()})
                  </div>
                }
              ></Private>
            </div>
          </div>

          <div className="portfolio-stat">
            <p>Best Performer</p>
            <div className="stat-value">
              <Private
                hidden={hidden}
                element={
                  <div className="">
                    <FontAwesomeIcon
                      icon={icons.faCaretDown}
                      className="caret"
                    />
                    {stats.best.percent}%($
                    {stats.best.amount.toLocaleString()})
                  </div>
                }
              ></Private>
            </div>
          </div>

          <div className="portfolio-stat">
            <p>Worst Performer</p>
            <div className="stat-value">
              <Private
                hidden={hidden}
                element={
                  <div className="">
                    <FontAwesomeIcon
                      icon={icons.faCaretDown}
                      className="caret"
                    />
                    {stats.worst.percent}%($
                    {stats.worst.amount.toLocaleString()})
                  </div>
                }
              ></Private>
            </div>
          </div>
        </div>

        <div className="portfolio-main-table">
          <p className="subheader">Your Assets</p>
          <table className="portfolio-table">
            <thead>
              <tr className="table-head">
                <th className="center">#</th>
                <th className="left">Coin</th>
                <th className="center">Price</th>
                <th className="right">24h</th>
                <th className="center">Holdings</th>
                <th className="center">Avg. Buy Price</th>
                <th className="center">Profit/Loss</th>
                <th className="center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {holdingsData.map((held: any) => {
                let crypto: any = cryptos.find(
                  (x: any) => x.id === held.id
                ) || {
                  current_price: 0,
                  price_change_percentage_24h_in_currency: 0,
                  market_cap_rank: 0,
                  image: "",
                  name: "",
                  symbol: "",
                };

                return (
                  <tr key={nanoid()} className="crypto-row">
                    <td className="portfolio-table-rank">
                      <p>{crypto.market_cap_rank}.</p>
                    </td>

                    <td className="portfolio-table-crypto-name">
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

                    <td className="portfolio-table-price">
                      <p className="right">
                        $
                        {crypto.current_price.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </td>

                    <td className="portfolio-table-24h right">
                      <Percent
                        value={crypto.price_change_percentage_24h_in_currency}
                      />
                    </td>

                    <td className="portolio-table-holdings right">
                      <Private
                        hidden={hidden}
                        element={
                          <div className="">
                            <p className="">
                              $
                              {(
                                Number(held.quantity) * crypto.current_price
                              ).toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                                minimumFractionDigits: 2,
                              })}
                            </p>
                            <p className="">
                              {held.quantity} {crypto.symbol.toUpperCase()}
                            </p>
                          </div>
                        }
                      ></Private>
                    </td>

                    <td className="portolio-table-avg-buy-price">
                      <p className="right">
                        $
                        {crypto.current_price.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </td>

                    <td className="portolio-table-profit-loss right">
                      <Private
                        hidden={hidden}
                        element={
                          <div className="">
                            <p className="">
                              $
                              {stats.total.toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                                minimumFractionDigits: 2,
                              })}
                            </p>
                            <p className="">{stats.percentChange}</p>
                          </div>
                        }
                      ></Private>
                    </td>

                    <td className="portfolio-table-actions center">
                      <div className="action-btns">
                        <DialogModal
                          buttonLabel={<FontAwesomeIcon icon={icons.faPlus} />}
                          buttonClass="btn-table"
                          elements={
                            <ModalAddTransaction
                              cryptos={cryptos}
                              cryptoId={crypto.id}
                              addPortfolioTransaction={addPortfolioTransaction}
                            />
                          }
                        />

                        <DialogModal
                          buttonLabel={
                            <FontAwesomeIcon icon={icons.faEllipsisVertical} />
                          }
                          buttonClass="btn-table"
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
  );
}

function ModalAddTransaction({
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
    // closeDialog();
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
    <div className="ModalAddTransaction">
      <div className="header">
        <p className="subtitle">Add Transaction</p>
      </div>

      <div className="nav-buttons">
        {txTypes.map((tab: any) => {
          return (
            <button
              key={nanoid()}
              className={tab === txType ? "btn-tab active" : "btn-tab"}
              onClick={() => {
                setTxType(tab);
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <select
        className="crypto-select"
        value={selectedCrypto.id}
        onChange={(e: any) => {
          setSelectedCrypto(cryptos.find((x: any) => x.id === e.target.value));
        }}
      >
        {cryptos.map((crypto: any) => {
          return (
            <option key={nanoid()} value={crypto.id}>
              {crypto.name}
            </option>
          );
        })}
      </select>

      <div className="transaction-inputs">
        <div className="input-block">
          <p>Quantity</p>
          <input
            type="number"
            value={quantityInput}
            onChange={(e: any) => {
              setQuantityInput(e.target.value);
            }}
            min={0}
            ref={quantityRef}
          />
        </div>
        <div className="input-block">
          <p>$ Price Per Coin</p>
          <input
            type="number"
            value={pricePerCoin}
            onChange={(e: any) => {
              setPricePerCoin(e.target.value);
            }}
            min={0}
          />
        </div>
      </div>

      {txType !== "Transfer" && (
        <div className="transaction-total">
          <p>{txType === "Buy" ? "Total Spent" : "Total Received"}</p>
          <p className="total">$ {totalCost}</p>
        </div>
      )}

      {/* <div className="transaction-inputs-sub">
        <button className="">Date</button>
        <button className="">Fee</button>
        <button className="">Notes</button>
      </div> */}

      <button className="btn btn-add" onClick={addTransaction}>
        Add Transaction
      </button>
    </div>
  );
}

ModalAddTransaction.defaultProps = {
  closeDialog: () => {},
  cryptoId: "bitcoin",
};

function ModalCreatePortfolio(props: any) {
  return (
    <div className="ModalAddTransaction">
      <div className="header">
        <p className="subtitle">Select Coin</p>
      </div>

      <div className="">
        <div className="">
          <p>Portfolio avatar</p>
          <img />
        </div>

        <button className="btn">Change</button>
      </div>

      <form method="dialog">
        <div className="portfolio-input">
          <p className="">Portfolio name</p>
          <input type="text" />
          <p>0/24 characters</p>
        </div>

        <button className="btn">Create Portfolio</button>
      </form>
    </div>
  );
}

function ModalEditTransaction({ cryptoId, deletePortfolioTransactions }: any) {
  return (
    <div className="ModalEditTransaction">
      <div className="header">
        <p className="subtitle">Remove this coin</p>
        <p className="">
          All transactions associated with this coin will be removed.
        </p>
      </div>

      <div className="commands">
        <button
          onClick={() => {
            deletePortfolioTransactions(cryptoId);
          }}
          className="btn btn-remove"
        >
          Remove
        </button>
        <button>Cancel</button>
      </div>
    </div>
  );
}
