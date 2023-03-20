import "./CryptoCard.scss";
import { Sparklines, SparklinesLine } from "react-sparklines";
import Change from "../../Change";

export default function CryptoCard(props: any) {
  let crypto = props.crypto;

  return (
    <div className="CryptoCard">
      {/* <p className="crypto-symbol">{crypto}</p> */}
      {crypto ? (
        <div className="card-container">
          <div className="card-main">
            <div className="card-icon">
              <img className="card-img" src={crypto.image} />
              <p className="card-symbol">{crypto.symbol}</p>
            </div>

            <div className="">
              <p className="card-name">{crypto.name}</p>
              <div className="card-market">
                <p className="card-price">
                  $
                  {crypto.current_price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <Change value={crypto.price_change_percentage_24h}></Change>
              </div>
            </div>
          </div>

          <div className="card-sparkline">
            <Sparklines data={crypto.sparkline_in_7d.price} margin={0}>
              <SparklinesLine
                color={
                  crypto.sparkline_in_7d.price[0] >
                  crypto.sparkline_in_7d.price[
                    crypto.sparkline_in_7d.price.length - 1
                  ]
                    ? "var(--clr-loss)"
                    : "var(--clr-gain)"
                }
                style={{ fill: "none", strokeWidth: 3 }}
              />
            </Sparklines>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
