import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';


const Coin = () => {
   const {coinId}=useparams();
   const [coinData,setCoinData]=useState();
   const[historicalData,setHistoricalData]=useState();
   const{currency} =useContext(CoinContext)

   const fetchCoinData=async()=>{
    const url = 'https://api.coingecko.com/api/v3/coins/${coinId}';
const options = {method: 'GET', headers: {'x-cg-demo-api-key': '<api-key>'}, body: undefined};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  setCoinData(data);
} catch (error) {
  console.error(error);
}
   }
 const fetchHistoricalData=async()=>{
  const url = 'https://api.coingecko.com/api/v3/coins/${coinid}/market_chart?vs_currency=${currency.name}&days=10&interval=daily';
const options = {method: 'GET', headers: {'x-cg-demo-api-key': '<api-key>'}, body: undefined};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  setHistoricalData(data);
} catch (error) {
  console.error(error);
}
 }

   useEffect(()=>{
    fetchCoinData();
    fetchHistoricalData();
   },[currency])

if(coinData && historicalData){
  
  return (
    <div className='coin'>
      <div className="coin-name">
        <img src={coinData.image.large} alt=""/>
        <P><b>{coinData.name}({coinData.symbol.toUpperCase()})</b></P>
      </div>
      <div className="coin-chart">
        <LineChart historicalData={historicalData} />
      </div>
      <div className="coin-info">
        <ul>
           <li>Crypto Market Rank</li>
           <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
           <li>Current Price</li>
           <li>{currency.symbol}{coinData.market_data.current_price
           [currency.name].toLocaleString}</li>
        </ul>
        <ul>
           <li>Market Cap</li>
           <li>{currency.symbol}{coinData.market_data.market_cap
           [currency.name].toLocaleString}</li>
        </ul>
        <ul>
           <li>24 Hour high</li>
           <li>{currency.symbol}{coinData.market_data.high_24h
           [currency.name].toLocaleString}</li>
        </ul>
        <ul>
           <li>24 Hour low</li>
           <li>{currency.symbol}{coinData.market_data.low_24h
           [currency.name].toLocaleString}</li>
        </ul>


      </div>
    </div>
  )}else{
    return (
    <div className='spinner'>
      <div className="spin">
      </div>  
    </div>
  )
  }

  
}

export default Coin
