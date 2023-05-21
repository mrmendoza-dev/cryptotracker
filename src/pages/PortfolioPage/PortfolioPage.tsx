import { useEffect, useState, useRef } from "react";
import "./PortfolioPage.scss";
import { Percent } from "../../components/Percent";
import Private from "../../components/Private";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../assets/icons";
import useLocalStorage from "../../hooks/useLocalStorage";


export default function PortfolioPage({cryptos}: any) {
  const [hidden, setHidden] = useLocalStorage("hidden", false);
  const [stats, setStats] = useState({
    total: 1235.67,
    percentChange: 48.25,
    amountChange: 12475.92,
    profit: { percent: 60.59, amount: 58935.36 },
    best: { percent: 0.97, amount: 36.06 },
    worst: { percent: 64.2, amount: 29082.71 },
  });
  const holdings: any = {
    bitcoin: 0.01,
    dogecoin: 1000,
    ethereum: 1,
    litecoin: 5,
    cardano: 100,
  };

  const coingeckoUrl = "https://www.coingecko.com/en/coins/";


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

  const closeDialog = () => {
    dialogRef.current.close();
  };





  return (
    <div className="Portfolio">
      <dialog
        ref={dialogRef}
        data-modal
        className="dialog-modal"
        onClick={(e) => {
          const dialogDimensions = dialogRef.current.getBoundingClientRect();
          if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
          ) {
            closeDialog();
          }
        }}
      >
        <div className="header">
          <p className="">Select Coin</p>
          <button className="" onClick={closeDialog}>
            Close
          </button>
        </div>
        <input type="text" />
        <div className="coin-list"></div>
      </dialog>

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
          <button className="btn btn-sidebar"
          onClick={openDialog}
          >
            <FontAwesomeIcon icon={icons.faCirclePlus} />
            Create portfolio
          </button>

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
            <button className="btn btn-more" onClick={openDialog}>
              <FontAwesomeIcon icon={icons.faEllipsis} />
              More
            </button>
            <button className="btn btn-add" onClick={openDialog}>
              <FontAwesomeIcon icon={icons.faCirclePlus} />
              Add New
            </button>
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
                            <button className="btn-table" onClick={openDialog}>
                              <FontAwesomeIcon icon={icons.faPlus} />
                            </button>
                            <button className="btn-table">
                              <FontAwesomeIcon
                                icon={icons.faEllipsisVertical}
                              />
                            </button>
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
