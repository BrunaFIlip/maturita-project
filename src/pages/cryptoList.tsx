import {FC, useState, useEffect} from 'react'
import axios from "axios"
import {Coin} from '../components/Coin';
import {
  SCoinApp,
  SCoinSearch,
  SCoinText,
  SCoinInput
} from '../../src/styles/coin'
import IPageProps from '../interfaces/page';



const ListOfCrypto: FC<IPageProps> = () => {
    const[coins, setCoins] = useState<any[]>([])
    const[search, setSearch] = useState('')
    
    
    useEffect(() => {
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=CZK&order=market_cap_desc&per_page=100&page=1&sparkline=false').then(res => {
        setCoins(res.data)
      }).catch(error => console.log(error))
    }, []);

      const handleChange = (e:any) => {
          setSearch(e.target.value)
      }


      const filteredCoins = coins.filter(coin =>
        coin['name'].toLowerCase().includes(search.toLowerCase())
      );
    

    return (<>
<SCoinApp>
<table>
  <thead>
<SCoinSearch>
<SCoinText>
<form>
<SCoinInput type="text" placeholder="Hledat" onChange={handleChange}/>
</form>
</SCoinText>
</SCoinSearch>
</thead>
  <tbody>
  {filteredCoins.map(coin => {
  return (
    <tr
    onClick={() => {
      window.location.pathname = '/nasrat/' + coin['id']
    }}
    >
      <td>
    <Coin 
    key={coin['id']} 
    name={coin['name']} 
    image={coin['image']} 
    symbol={coin['symbol']} 
    marketcap={coin['market_cap']} 
    price={coin['current_price']} 
    priceChange={coin['price_change_percentage_24h']}
    volume={coin['totasl_volume']}/>
    </td>
    </tr>
  )
})}
  </tbody>
</table>
</SCoinApp>
</>
    )
}


export default ListOfCrypto;