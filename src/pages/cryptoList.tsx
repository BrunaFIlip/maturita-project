import React, {FC, useState, useEffect} from 'react'
import axios from "axios"
import Coin from '../Coin';
import {
  SCoinApp,
  SCoinSearch,
  SCoinText,
  SCoinInput
} from '../../src/styles/coin'
import IPageProps from '../interfaces/page';

export const lisOfCrypto: FC = () => {
    const[coins, setCoins] = useState([])
    const[search, setSearch] = useState('')
    
    
    useEffect(() => {
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=CZK&order=market_cap_desc&per_page=100&page=1&sparkline=false').then(res => {
        setCoins(res.data)
      }).catch(error => console.log(error))
    }, []);

      const handleChange = (e:any) => {
          setSearch(e.target.value)
      }

      const filteredCoins = coins.filter(coin => coin['name'])


    return (
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
    <Coin key={coin['id']} 
    name={coin['name']} 
    image={coin['image']} 
    symbol={coin['symbol']} 
    marketcap={coin['market_cap']} 
    price={coin['current_price']} 
    priceChange={coin['price_change_percentage_24h']}
    volume={coin['totasl_volume']}/>
  )
})}
</SCoinApp>
    )
}
