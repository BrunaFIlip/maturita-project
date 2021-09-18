import logo from './logo.svg';
import Ract, {useState, sueEffect, useEffect} from 'react'
import './App.css';
// import { 
//   MainTitle 
// } from 'styles/styledMainPage'
import styled from 'styled-components'
import axios from "axios"
import Coin from './Coin';
import {
  SCoinApp,
  SCoinSearch,
  SCoinText,
  SCoinInput
} from '../src/styles/coin'


const MainTitle = styled.h1`
margin-left: 10%;
padding-top: 10%;
font-size: 6rem;
text-align: left;
color: black;
`
const MainTitle2 = styled.h1`
margin-top: -2%;
margin-left: 10%;
font-size: 6rem;
text-align: left;
color: black;
`

const BitCoinImage = styled.img`
width: 500px;
display: block;
margin-top: 7%;
margin-right: 15%;
float: right;
`
const STable = styled.table`
margin-left: 5%;
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 90%;
`

const STd = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`

const STh = styled.th`
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
`


function App() {
  const[coins, setCoins] = useState([])
const[search, setSearch] = useState('')


useEffect(() => {
  axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=CZK&order=market_cap_desc&per_page=100&page=1&sparkline=false').then(res => {
    setCoins(res.data)
  }).catch(error => console.log(error))
}, []);

const handleChange = e => {
  setSearch(e.target.value)
}

const filteredCoins = coins.filter(coin => 
  coin.name.toLowerCase().includes(search.toLowerCase())
)


  return (<>
    <BitCoinImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BTC_Logo.svg/2000px-BTC_Logo.svg.png"></BitCoinImage>
    <div>
    <MainTitle>Shrekova</MainTitle>
<MainTitle2>cryptobažina</MainTitle2>
</div>

<br/>

<SCoinApp>
<SCoinSearch>
<SCoinText>
<form>
<SCoinInput type="text" placeholder="Hledat" onChange={handleChange}/>
</form>
</SCoinText>
</SCoinSearch>
{filteredCoins.map(coin => {
  return (
    <Coin key={coin.id} 
    name={coin.name} 
    image={coin.image} 
    symbol={coin.symbol} 
    marketcap={coin.market_cap} 
    price={coin.current_price} 
    priceChange={coin.price_change_percentage_24h}
    volume={coin.totasl_volume}/>
  )
})}
</SCoinApp>
<br/>
</>
  );
}

export default App;
