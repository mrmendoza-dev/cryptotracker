import { useEffect, useState } from "react";
import "./index.css";
import styled from "styled-components";



const colorCodes = ["#F02602", "#FF8400", "#FDD101", "#B7DD16", "#4FBA1E"];

const Percent = styled.p<{ data: any }>`
  color: ${(props: any) =>
    props.data >= 80
      ? colorCodes[4]
      : props.data >= 60
      ? colorCodes[3]
      : props.data >= 40
      ? colorCodes[2]
      : props.data >= 20
      ? colorCodes[1]
      : colorCodes[0]};
`;


export default function FearGreed() {
  const [index, setIndex] = useState({ value: "", value_classification: "", timestamp: ""});
  const [history, setHistory] = useState([]);
  const limit = 10;
  const dataFormats = ["json", "csv"]
  const dateFormats = ["", "us", "cn", "kr", "world"];

  const url =
    `https://api.alternative.me/fng/?limit=${limit}&format=${dataFormats[0]}&date_format=${dateFormats[1]}`;

  function getApiData() {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setHistory(data.data);
        setIndex(data.data[0]);
      });
  }
  useEffect(getApiData, []);

  return (
    <div className="FearGreed module">
      <p className="module-title">Crypto Fear/Greed</p>
      <Percent className="fg-value" data={index.value}>
        {index.value}
      </Percent>
      <p className="fg-class">{index.value_classification}</p>

      <a
        href="https://alternative.me/crypto/fear-and-greed-index/"
        target="_blank"
      >
        <p className="fg-time">Last Update: {index.timestamp}</p>
      </a>
    </div>
  );
}
