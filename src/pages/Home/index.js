import React, { useEffect, useState } from "react";
import ClayForm, { ClayInput, ClaySelect } from "@clayui/form";
import ClayButton from "@clayui/button";
import "./index.scss";
import api from "../../api";

const { Group: ClayInputGroup, GroupItem } = ClayInput;
const { Group } = ClayForm;

const apiKey = process.env.REACT_APP_EXCHANGE_RATE_API_KEY;

const fetchCoins = (updateCoins, updateError) =>
  api
    .get(`latest?access_key=${apiKey}`)
    .then((response) => {
      const {
        data: { rates },
      } = response;

      const ratesArray = Object.keys(rates).map((key) => {
        return {
          [key]: rates[key],
        };
      });

      ratesArray.unshift({ "": "" });

      updateCoins(ratesArray);
    })
    .catch(() => {
      updateError(true);
    });

const handleClick = (coinTo, coinFrom, value, updateResult) => {
  if (!value) {
    updateResult("Digite um valor");
  } else if (!coinTo || !coinFrom) {
    updateResult("Selecione as moedas");
  } else {
    const result = (value * (coinTo / coinFrom)).toFixed(2);
    updateResult(result);
  }
};

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [coinFrom, setCoinFrom] = useState("");
  const [coinTo, setCoinTo] = useState("");
  const [value, setValue] = useState();
  const [result, setResult] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchCoins(setCoins, setError);
  }, [coinFrom, coinTo]);

  return (
    <div className="home">
      <h1>Conversão de Moedas</h1>
      <Group>
        <ClayInputGroup>
          {error && <div>Erro na API</div>}
          <GroupItem>
            <label htmlFor="Value From">Valor</label>
            <ClayInput
              aria-label="Value From"
              onChange={(e) => setValue(e.target.value)}
              type="number"
              value={value}
            />
            <label htmlFor="Select Label">De</label>
            <ClaySelect
              aria-label="Select Label"
              id="mySelectId"
              onChange={(e) => setCoinFrom(e.target.value)}
            >
              {coins.map((item) => {
                const key = Object.keys(item);
                return (
                  <ClaySelect.Option key={key} label={key} value={item[key]} />
                );
              })}
            </ClaySelect>
            <label htmlFor="Select Label">Para</label>
            <ClaySelect
              aria-label="Select Label"
              id="mySelectId"
              onChange={(e) => setCoinTo(e.target.value)}
            >
              {coins.map((item) => {
                const key = Object.keys(item);
                return (
                  <ClaySelect.Option key={key} label={key} value={item[key]} />
                );
              })}
            </ClaySelect>
            <label htmlFor="Select Label">Resultado</label>
            <ClayInput value={result} readOnly />
            <div className="container_button">
              <ClayButton
                displayType="primary"
                onClick={() => handleClick(coinTo, coinFrom, value, setResult)}
              >
                Converter
              </ClayButton>
            </div>
          </GroupItem>
        </ClayInputGroup>
      </Group>
    </div>
  );
};

export default Home;
