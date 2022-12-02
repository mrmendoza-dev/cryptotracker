



import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./index.css"
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);


export default function Dominance(props: any) {
  let data = props.cryptos;
  let dominanceList = [];
  for (let key in data) {
    dominanceList.push({ id: key, value: data[key] });
  }
  const top3 = dominanceList.slice(0,3);

  const chartData = {
    labels: Object.keys(data).map((name) => name.toUpperCase()),
    datasets: [
      {
        label: "Market Dominance",
        data: Object.values(data).map((value: any) => value.toFixed(1)),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
    <div className="Dominance module">
      <p className="module-title">Dominance</p>
      {/* <p>{props.cryptos.btc}</p> */}
      {/* {props.cryptos ? <p>{props.cryptos}</p> : <></>} */}
      <div className="top-3">
        {top3?.map((crypto) => {
          return (
            <div key={nanoid()} className="top-3-crypto">
              <p className="top-3-name">{crypto.id}</p>
              <p className="top-3-value">{crypto.value.toFixed(1)}%</p>
            </div>
          );
        })}
      </div>

      <Pie data={chartData} />
    </div>
  );
}


