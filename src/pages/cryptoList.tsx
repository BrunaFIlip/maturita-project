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
import {useParams, useHistory} from 'react-router-dom'
import Paging from '../components/paging'
import ReactLoading from 'react-loading'


interface IPageProps {
  name: string;
}


const ListOfCrypto: FC<IPageProps> = () => {
    const[coins, setCoins] = useState<any[]>([])
    const[search, setSearch] = useState('')
    const {page}: {page: string} = useParams();
    const[loading, setLoading] = useState(false)
    
    const history = useHistory()
    

    const fetchMarketData = async () => {
        const marketData = await getMarketDataList({page}.page);
        setCoins(marketData);
        setLoading(true);
   }

    useEffect(() => {
      setLoading(false)
     fetchMarketData();
    }, [page]);

      const handleChange = (e:any) => {
          setSearch(e.target.value)
      }


      const filteredCoins = coins.filter(coin =>
        coin['name'].toLowerCase().includes(search.toLowerCase())
      );
    
return (<>
<SCoinApp>

<SCoinSearch>
<SCoinText>
<form>
<SCoinInput type="text" placeholder="Hledat" onChange={handleChange}/>
</form>
</SCoinText>
</SCoinSearch>
{!loading ? <ReactLoading type="bars" color="balck"/> : <>
<Paging page={Number({page}.page)}/>
<table>

  <tbody>
  {filteredCoins.map(coin => {
  return (
    <tr
    onClick={() => {
      history.push('/details/' + coin['id'] + "/" + {page}.page)
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
<Paging page={Number({page}.page)}/>
</>
}
</SCoinApp>
</>
    )
}


export default ListOfCrypto;