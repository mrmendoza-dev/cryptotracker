import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { Percent } from "@/components/ui/Percent";
import useLocalStorage from "@/hooks/useLocalStorage";
import { faStarFilled, faStarEmpty, faAngleLeft, faAngleRight } from "@/assets/icons";
import { useCryptoData } from "@/hooks/useCryptoData";

export const CryptosPage = () => {
  const coingeckoUrl = "https://www.coingecko.com/en/coins/";
  const [pageNum, setPageNum] = useState(1);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const { cryptos, fetchCryptos } = useCryptoData();

  function favoriteCrypto(crypto: any) {
    let fav = favorites.slice();
    if (fav.includes(crypto)) {
      fav = fav.filter((e: any) => e !== crypto);
    } else {
      fav.push(crypto);
    }
    setFavorites(fav);
  }

  function nextPage() {
    setPageNum((prevPage) => prevPage + 1);
  }
  function prevPage() {
    if (pageNum > 1) {
      setPageNum((prevPage) => prevPage - 1);
    }
  }
  function goToPage(page: any) {
    setPageNum(page);
  }

  useEffect(() => {
    fetchCryptos(pageNum);
  }, [pageNum]);

  const renderPagination = () => {
    let pages = Array.from({ length: 10 }, (x, i) => i + (pageNum - 5));
    pages = pages.filter((page) => page > 0);

    if (!pages.includes(1)) {
      pages.unshift(1);
    }

    return pages.map((page) => (
      <button
        key={nanoid()}
        className={`
          px-3 py-2 font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-100
          ${page === pageNum ? "bg-gray-100 dark:bg-gray-700" : "bg-inherit text-gray-700 dark:text-gray-400"}
        `}
        onClick={() => goToPage(page)}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="border-gray-500 dark:border-gray-400 px-4 mx-auto">
      <div className="overflow-x-auto max-w-[1200px] mx-auto">
        <table className="w-full border-collapse relative z-10 font-normal mt-6">
          <thead>
            <tr
              className="h-[4.2em] border-t border-b border-gray-100 dark:border-gray-700 
              text-sm sticky top-0 bg-white dark:bg-gray-900 z-20"
            >
              <th className="text-center">#</th>
              <th className="text-left">Coin</th>
              <th className="text-center">Price</th>
              <th className="text-right">1h</th>
              <th className="text-right">24h</th>
              <th className="text-right">7d</th>
              <th className="text-center">24h Volume</th>
              <th className="text-center">Market Cap</th>
              <th className="text-center">Last 7 Days</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((crypto: any) => (
              <tr
                key={crypto.id}
                className="h-[4.2em] border-b border-gray-100 dark:border-gray-700 
                  text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 
                  dark:hover:bg-gray-800 transition-colors duration-100"
              >
                <td className="px-1">
                  <div className="flex items-center gap-2.5 h-[4.2em] font-semibold">
                    <button
                      onClick={() => favoriteCrypto(crypto.id)}
                      className="text-gray-500 dark:text-gray-400 hover:text-[#ffcc66] 
                        transition-colors duration-100 bg-transparent border-0 text-base p-0"
                    >
                      <FontAwesomeIcon
                        icon={
                          favorites.includes(crypto.id)
                            ? faStarFilled
                            : faStarEmpty
                        }
                        className={
                          favorites.includes(crypto.id) ? "text-[#ffcc66]" : ""
                        }
                      />
                    </button>
                    <p>{crypto.market_cap_rank}.</p>
                  </div>
                </td>

                <td className="px-1">
                  <a
                    href={`${coingeckoUrl}${crypto.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-3 items-center"
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

                <td className="text-right px-1">
                  $
                  {crypto.current_price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </td>

                <td className="px-1">
                  <Percent
                    value={crypto.price_change_percentage_1h_in_currency}
                    className="justify-end"
                  />
                </td>

                <td className="px-1">
                  <Percent
                    value={crypto.price_change_percentage_24h_in_currency}
                    className="justify-end"
                  />
                </td>

                <td className="px-1">
                  <Percent
                    value={crypto.price_change_percentage_7d_in_currency}
                    className="justify-end"
                  />
                </td>

                <td className="text-right px-1">
                  ${crypto.total_volume.toLocaleString()}
                </td>

                <td className="text-right px-1">
                  ${crypto.market_cap.toLocaleString()}
                </td>

                <td className="text-center px-1">
                  <Sparklines data={crypto.sparkline_in_7d.price} margin={0}>
                    <SparklinesLine
                      color={
                        crypto.sparkline_in_7d.price[0] >
                        crypto.sparkline_in_7d.price[
                          crypto.sparkline_in_7d.price.length - 1
                        ]
                          ? "#ef4444" // text-red-500
                          : "#10b981" // text-emerald-500
                      }
                      style={{ fill: "none", strokeWidth: 3 }}
                    />
                  </Sparklines>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center py-4">
        <button
          className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100 
            border border-gray-400 dark:border-gray-600 bg-transparent 
            hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-100"
          onClick={prevPage}
        >
          <FontAwesomeIcon icon={faAngleLeft} className="mr-2" />
          Back
        </button>

        <div className="flex">{renderPagination()}</div>

        <button
          className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100 
            border border-gray-400 dark:border-gray-600 bg-transparent 
            hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-100"
          onClick={nextPage}
        >
          Next
          <FontAwesomeIcon icon={faAngleRight} className="ml-2" />
        </button>
      </div>
    </div>
  );
}
