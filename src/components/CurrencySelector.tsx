
import React, { useState } from "react";


function CurrencySelector() {
  const defaultCurrency = {
    name: "United States Dollar",
    symbol: "$",
    code: "USD",
    locale: "en-US",
  };
  const [currentCurrency, setCurrentCurrency] = useState(defaultCurrency);

  const value: any = "123456789.99";

  const moneyValue = new Intl.NumberFormat(currentCurrency.locale, {
    style: "currency",
    currency: currentCurrency.code,
  }).format(value);

  function handleCurrencyChange(e: any) {
    const currency: any = currencyList.find(
      (currency) => currency.code === e.target.value
    );
    setCurrentCurrency(currency);
  }

  const currencyList = [
    { name: "United States Dollar", symbol: "$", code: "USD", locale: "en-US" },
    { name: "Euro", symbol: "€", code: "EUR", locale: "en-GB" },
    { name: "British Pound", symbol: "£", code: "GBP", locale: "en-GB" },
    { name: "Japanese Yen", symbol: "¥", code: "JPY", locale: "ja-JP" },
    { name: "Canadian Dollar", symbol: "CA$", code: "CAD", locale: "en-CA" },
    { name: "Australian Dollar", symbol: "A$", code: "AUD", locale: "en-AU" },
    { name: "Swiss Franc", symbol: "CHF", code: "CHF", locale: "de-CH" },
    { name: "Chinese Yuan", symbol: "¥", code: "CNY", locale: "zh-CN" },
    { name: "Indian Rupee", symbol: "₹", code: "INR", locale: "en-IN" },
    { name: "Brazilian Real", symbol: "R$", code: "BRL", locale: "pt-BR" },
    { name: "Mexican Peso", symbol: "MX$", code: "MXN", locale: "es-MX" },
    { name: "Russian Ruble", symbol: "₽", code: "RUB", locale: "ru-RU" },
    { name: "South African Rand", symbol: "R", code: "ZAR", locale: "en-ZA" },
    { name: "Swedish Krona", symbol: "kr", code: "SEK", locale: "sv-SE" },
    { name: "Singapore Dollar", symbol: "S$", code: "SGD", locale: "en-SG" },
    { name: "Hong Kong Dollar", symbol: "HK$", code: "HKD", locale: "zh-HK" },
    { name: "New Zealand Dollar", symbol: "NZ$", code: "NZD", locale: "en-NZ" },
    { name: "Norwegian Krone", symbol: "kr", code: "NOK", locale: "nb-NO" },
  ];

  return (
    <div className="CurrencySelector">
      <p>{moneyValue}</p>
      <p>{currentCurrency.code}</p>

      <select className="select" onChange={handleCurrencyChange}>
        {currencyList.map((currency) => (
          <option key={currency.code}>{currency.code}</option>
        ))}
      </select>
    </div>
  );
}


export default CurrencySelector;