
import { useEffect, useState } from "react";
import "./index.css";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../assets/icons";


export default function Converter(props: any) {

  const [quantity, setQuantity] = useState(1);
  const [result, setResult] = useState(1);
  const [baseCurrency, setBaseCurrency] = useState({id: "bitcoin", name: "Bitcoin", symbol: "BTC", price: 16000})
  const [targetCurrency, setTargetCurrency] = useState({id: "ethereum", name: "Ethereum", symbol: "ETH", price: 1200});


  const currencies = props.cryptos.map((crypto: any)=> {
    return { id: crypto.id, name: crypto.name, symbol: crypto.symbol.toUpperCase(), price: crypto.current_price };
  });

  const [formData, setFormData] = useState({
    quantity: 1,
    base: "bitcoin",
    target: "ethereum",
  });


  function handleChange(event: any) {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
    calculateResults();
  }

  function findCrypto(id: any) {
    return currencies.find((crypto: any) => {
      return crypto.id === id;
    });

  }
  
  useEffect(() => {
    calculateResults();
  }, []);



  useEffect(()=> {
    setQuantity(formData.quantity);
    setBaseCurrency(findCrypto(formData.base));
    setTargetCurrency(findCrypto(formData.target));
  }, [formData])

  function handleSubmit(event: any) {
    event.preventDefault();
    // submitToApi(formData)
  }

  function swapCurrencies() {
    let newBase = formData.target;
    let newTarget = formData.base;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        base: newBase,
        target: newTarget,
      };
    });
  }

  function calculateResults() {
    setResult(100);
  };


  return (
    <div className="Converter">
      <p className="module-title">Cryptocurrency Converter</p>
      <div className="">
        <div className="converter-form">
          <input
            type="number"
            className="form-quantity"
            placeholder="1"
            onChange={handleChange}
            name="quantity"
            value={formData.quantity}
          />

          <select
            className="form-select"
            onChange={handleChange}
            name="base"
            value={formData.base}
          >
            {currencies.map((currency: any) => (
              <option key={nanoid()} value={currency.id}>
                {currency.name} ({currency.symbol})
              </option>
            ))}
          </select>

          <button className="btn-swap" onClick={swapCurrencies}>
            <FontAwesomeIcon icon={icons.faArrowRightArrowLeft} />
          </button>

          <select
            className="form-select"
            onChange={handleChange}
            name="target"
            value={formData.target}
          >
            {currencies.map((currency: any) => (
              <option key={nanoid()} value={currency.id}>
                {currency.name} ({currency.symbol})
              </option>
            ))}
          </select>
        </div>

        <div className="results">
          <p className="">
            {/* {quantity} {baseCurrency.name} ({baseCurrency.symbol}) */}
          </p>
          <p>=</p>
          <p className="">
            {/* <span className="result">{result}</span> {targetCurrency.name} (
            {targetCurrency.symbol}) */}
          </p>
        </div>
      </div>
    </div>
  );
}
