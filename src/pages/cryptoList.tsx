import {FC, useState, useEffect} from 'react'
import {Coin} from '../components/Coin';
import {
  SCoinApp,
  SCoinSearch,
  SCoinText,
  SCoinInput,
  STd
} from '../../src/styles/coin'
import { getMarketDataList } from '../components/Graphs/marketData';
import {useParams} from 'react-router-dom'


interface IPageProps {
  name: string;
}


const ListOfCrypto: FC<IPageProps> = () => {
    const[coins, setCoins] = useState<any[]>([])
    const[search, setSearch] = useState('')
    const {page}: {page: string} = useParams();
    
    console.log({page}.page)
    
    useEffect(() => {
      const fetchMarketData = async () => {
        const marketData = await getMarketDataList({page}.page);
        setCoins(marketData);
        
    }
    fetchMarketData(); 
    }, []);

      const handleChange = (e:any) => {
          setSearch(e.target.value)
      }

      console.log(coins)

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
      window.location.pathname = '/details/' + coin['id'] + "/" + {page}.page
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