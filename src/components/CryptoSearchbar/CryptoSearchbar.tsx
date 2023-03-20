import "./CryptoSearchbar.scss";
import React, { useState, useRef } from "react";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../assets/icons";

export default function CryptoSearchbar(props: any) {
  let cryptoList = props.data;

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(cryptoList);

  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value);
    const filtered = cryptoList.filter((crypto: any) => {
      console.log(crypto);

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
    <div className={props.className}>
      <div className="search-input-wrapper">
        <label className="search-icon">
          <FontAwesomeIcon icon={icons.faMagnifyingGlass} />
        </label>
        <input
          className="nav-search-input"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>

      <div
        className="search-results-wrapper"
        style={{ display: searchTerm ? "block" : "none" }}
        onClick={() => {
          setSearchTerm("");
        }}
      ></div>

      <ul
        className="search-results"
        style={{ display: searchTerm ? "block" : "none" }}
      >
        <div className="search-input-wrapper">
          <label className="search-icon">
            <FontAwesomeIcon icon={icons.faMagnifyingGlass} />
          </label>
          <input
            className="nav-search-input"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>

        {filteredData.map((crypto: any) => (
          <a
            href={`https://www.coingecko.com/en/coins/${crypto.id}`}
            key={nanoid()}
          >
            <li key={crypto.id} className="search-row">
              <div className="crypto">
                <p className="name">{crypto.name}</p>
                <p className="symbol">{crypto.symbol.toUpperCase()}</p>
              </div>

              <p className="">#{crypto.market_cap_rank}</p>
            </li>
          </a>
        ))}
      </ul>
    </div>
  );
}
