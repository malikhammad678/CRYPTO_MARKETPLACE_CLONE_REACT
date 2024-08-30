import React, { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../components/Context/Context';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData,setHistoricalData] = useState(null);
  const { curr } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-97BC5bBULGt8fNScwhTnbqvX'
      }
    };
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
      const data = await response.json();
      setCoinData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHistoricalData = async () => {
    const options2 = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-97BC5bBULGt8fNScwhTnbqvX'
      }
    };
    try {
      const response2 = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${curr.name}&days=10&interval=daily`, options2);
      const data2 = await response2.json();
      setHistoricalData(data2);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [curr]);

  if (!coinData,!historicalData) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  return (
    <div className='coin'>
      <div className="coin_name">
        <img src={coinData.image.large} alt={coinData.name} />
        <p><b>{coinData.name} {coinData.symbol.toUpperCase()}</b></p>
      </div>
      <div className="coin_chart">
        <LineChart historicalData = {historicalData} />
      </div>

      <div className="coin_info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>{curr.symbol} {coinData.market_data.current_price[curr.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>{curr.symbol} {coinData.market_data.market_cap[curr.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24h high</li>
          <li>{curr.symbol} {coinData.market_data.high_24h[curr.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24h low</li>
          <li>{curr.symbol} {coinData.market_data.low_24h[curr.name].toLocaleString()}</li>
        </ul>
      </div>
    </div>
  );
};

export default Coin;
