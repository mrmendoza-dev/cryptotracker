import React, { useState, useRef } from "react";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "@/assets/icons";

export default function CryptoSearchbar(props: any) {
  let cryptoList = props.data;

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(cryptoList);

  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value);
    const filtered = cryptoList.filter((crypto: any) => {
      if (crypto.name && crypto.symbol) {
        if (
          crypto.name
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(event.target.value.toLowerCase())
        ) {
          return crypto;
        }
      }
    });
    setFilteredData(filtered);
  };

  return (
    <div className={`relative`}>
      {/* Search Input */}
      <div className="flex items-center text-sm p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
        <label className="flex items-center">
          <FontAwesomeIcon icon={icons.faMagnifyingGlass} />
        </label>
        <input
          className="outline-none border-none bg-transparent pl-2 text-inherit w-[300px] max-h-[300px]"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>

      {/* Overlay */}
      {searchTerm && (
        <div
          className="fixed inset-0 w-screen h-screen bg-black/40 z-[99]"
          onClick={() => setSearchTerm("")}
        />
      )}

      {/* Results Dropdown */}
      {searchTerm && (
        <ul
          className="absolute top-0 left-0 max-h-[400px] w-full overflow-y-auto overflow-x-hidden 
          bg-white dark:bg-gray-900 z-[100] rounded-lg p-2 shadow-lg"
        >
          {/* Search Input in Dropdown */}
          <div className="flex items-center text-sm font-normal">
            <label className="flex items-center text-gray-500 dark:text-gray-400">
              <FontAwesomeIcon icon={icons.faMagnifyingGlass} />
            </label>
            <input
              className="outline-none border-none bg-transparent pl-2 text-gray-500 
                dark:text-gray-400 w-full"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleInputChange}
            />
          </div>

          {/* Results */}
          {filteredData.map((crypto) => (
            <a
              href={`https://www.coingecko.com/en/coins/${crypto.id}`}
              key={nanoid()}
              className="block"
            >
              <li
                className="flex justify-between items-center rounded py-1.5 px-2 
                  text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {crypto.name}
                  </p>
                  <p className="text-sm">{crypto.symbol.toUpperCase()}</p>
                </div>
                <p>#{crypto.market_cap_rank}</p>
              </li>
            </a>
          ))}
        </ul>
      )}
    </div>
  );
}
