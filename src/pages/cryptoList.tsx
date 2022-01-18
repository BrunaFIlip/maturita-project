import {FC, useState, useEffect} from 'react'
import axios from "axios"
import {Coin} from '../components/Coin';
import {
  SCoinApp,
  SCoinSearch,
  SCoinText,
  SCoinInput,
  STd
} from '../../src/styles/coin'
import { getMarketData } from '../components/Graphs/marketData';

interface IPageProps {
  name: string;
}


const ListOfCrypto: FC<IPageProps> = () => {
    const[coins, setCoins] = useState<any[]>([])
    const[search, setSearch] = useState('')
    
    
    useEffect(() => {
      const fetchMarketData = async () => {
        const marketData = await getMarketData();
        setCoins(marketData);
        
    }
    fetchMarketData(); 
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
      <STd>
    <Coin 
    key={coin['id']} 
    name={coin['name']} 
    image={coin['image']} 
    symbol={coin['symbol']} 
    marketcap={coin['market_cap']} 
    price={coin['current_price']} 
    priceChange={coin['price_change_percentage_24h']}/>
    </STd>
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