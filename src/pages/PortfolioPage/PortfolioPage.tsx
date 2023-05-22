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

  const [holdings, setHoldings] = useLocalStorage("holdings", {
    bitcoin: 0.01,
    dogecoin: 1000,
    ethereum: 1,
    litecoin: 5,
    cardano: 100,
  });

  
  useEffect(() => {
    console.log("holdings changed");
    console.log(holdings);
    calculateStats();
  }, [holdings]);


  const coingeckoUrl = "https://www.coingecko.com/en/coins/";

function addPortfolioTransaction(crypto: any, quantity: number, pricePerCoin: number) {
  console.log("add portfolio transaction");



  setHoldings((prevHoldings: any) => {
    const updatedHoldings = { ...prevHoldings };
    updatedHoldings[crypto] = (prevHoldings[crypto] || 0) + quantity;
    return updatedHoldings;
  });


}

function deletePortfolioTransactions(crypto: any) {
  console.log("delete portfolio transaction");
  console.log(crypto);

  setHoldings((prevHoldings: any) => {
    const updatedHoldings = { ...prevHoldings };
    delete updatedHoldings[crypto];
    return updatedHoldings;
  });
}




  function hideBalance() {
    setHidden((prevState: any) => !prevState);
  }

  function calculateStats() {
    let total = 0;
    Object.keys(holdings).map((held: any) => {
      let crypto: any = cryptos.find((x: any) => x.id === held);
      crypto ? (total += crypto.current_price * holdings[held]) : (total += 0);
    });
    setStats((prevStats) => {
      return { ...prevStats, total: total };
    });
  }

  useEffect(() => {
    calculateStats();
  }, [cryptos]);

  const dialogRef: any = useRef(null);
  const openDialog = () => {
    dialogRef.current.showModal();
  };

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
              elements={ModalAddTransaction({ cryptos, addPortfolioTransaction })}
            />
          </div>
        </div>

        <div className="portfolio-main-chart"></div>

        <div className="portfolio-main-allocation">
          <div className="allocation-wrapper">
            <div className="allocation-bar">
              <div className="allocation-bar"></div>
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
              {Object.keys(holdings).map((held: any) => {
                let crypto: any = cryptos.find((x: any) => x.id === held);

                return (
                  <>
                    {crypto ? (
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
                            data={
                              crypto.price_change_percentage_24h_in_currency
                            }
                          >
                            {Number(
                              crypto.price_change_percentage_24h_in_currency
                            ).toFixed(1)}
                            %
                          </Percent>
                        </td>

                        <td className="portolio-table-holdings right">
                          <Private
                            hidden={hidden}
                            element={
                              <div className="">
                                <p className="">
                                  $
                                  {(
                                    holdings[held] * crypto.current_price
                                  ).toLocaleString(undefined, {
                                    maximumFractionDigits: 2,
                                    minimumFractionDigits: 2,
                                  })}
                                </p>
                                <p className="">
                                  {holdings[held]} {crypto.symbol.toUpperCase()}
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
                              buttonLabel={
                                <FontAwesomeIcon icon={icons.faPlus} />
                              }
                              buttonClass="btn-table"
                              elements={
                                <ModalAddTransaction
                                  cryptos={cryptos}
                                  addPortfolioTransaction={
                                    addPortfolioTransaction
                                  }
                                />
                              }
                            />

                            <DialogModal
                              buttonLabel={
                                <FontAwesomeIcon
                                  icon={icons.faEllipsisVertical}
                                />
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
                    ) : (
                      <></>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


function ModalAddTransaction({ cryptos, addPortfolioTransaction }: any) {
  const [totalCost, setTotalCost] = useState(0);
  const [selectedCrypto, setSelectedCrypto] = useState(cryptos[0]);
  const [quantity, setQuantity] = useState(0);
  const [pricePerCoin, setPricePerCoin] = useState(0);



  function addTransaction() {
    console.log("add transaction");
    console.log(selectedCrypto);
    console.log(quantity);
    console.log(pricePerCoin);
    console.log(`${selectedCrypto.id} ${quantity}`)
    addPortfolioTransaction(selectedCrypto.id, quantity, pricePerCoin);
    setQuantity(0);
    setSelectedCrypto(cryptos[0]);

  }



  useEffect(() => {
    setTotalCost(quantity * pricePerCoin);
  }, [quantity, pricePerCoin])

  useEffect(() => {
    setPricePerCoin(selectedCrypto.current_price);
  }, [selectedCrypto])

  return (
    <div className="ModalAddTransaction">
      <div className="header">
        <p className="subtitle">Add Transaction</p>
      </div>

      <div className="nav-buttons">
        <button className="">Buy</button>
        <button className="">Sell</button>
        <button className="">Transfer</button>
      </div>

      <select className="crypto-select"
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
            value={quantity}
            onChange={(e: any) => {
              setQuantity(e.target.value);
            }}
          />
        </div>
        <div className="input-block">
          <p>Price Per Coin</p>
          <input
            type="number"
            value={pricePerCoin}
            onChange={(e: any) => {
              setPricePerCoin(e.target.value);
            }}
          />
        </div>
      </div>

      {/* <div className=""></div> */}

      <div className="transaction-total">
        <p>Total Spent</p>
        <p className="total">$ {totalCost}</p>
      </div>

      {/* <div className="transaction-inputs-sub">
        <button className="">Date</button>
        <button className="">Fee</button>
        <button className="">Notes</button>
      </div> */}

      <button className="btn btn-add"
        onClick={addTransaction}
      >Add Transaction</button>
    </div>
  );
}

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



function ModalEditTransaction({cryptoId, deletePortfolioTransactions}: any) {
  return (
    <div className="ModalEditTransaction">
      <div className="header">
        <p className="subtitle">Remove this coin</p>
        <p className="">All transactions associated with this coin will be removed.</p>
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
