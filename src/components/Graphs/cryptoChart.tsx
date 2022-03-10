import React, {useState, useEffect} from 'react';
import { getMarketDataChart } from './marketData';
import {Line} from 'react-chartjs-2'
import { SDiv } from '../../styles/popUpCharts';
import {useParams} from 'react-router-dom'
import { STable, STr, STh } from '../../styles/coinDetails';
import { SButtonBack } from '../../styles/newCrypto';
import { useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading'
import {SMiddle} from '../../styles/myCrypto'





const Chart = (props:any) => {
  const {id}: {id: string} = useParams();
  const {page}: {page: string}  = useParams();
  const [data, setData] = useState([]);
  const [prices, setPrices] = useState<any>([]);
  const [dates, setDates] = useState<any>([]);
  const [name, setName] = useState<string>();
  const[loading, setLoading] = useState(false)

  
  const history = useHistory();

  
useEffect(() => {
    const fetchMarketData = async () => {
        const marketData = await getMarketDataChart({page}.page);
        setData(marketData);
    }
    fetchMarketData(); 
}, [])



useEffect(() => {
  let xArray:any = [];
  let yArray:any = [];

  let i = 0;
  let x = 0;
  while(true){
      try{
        if(data[x]['id'] === {id}.id){
            while(true){
                try{
                    const pr = data[x]['sparkline_in_7d']['price'][i]['y'];
                    xArray.push(pr);
                    const date = data[x]['sparkline_in_7d']['price'][i]['x'];

                    yArray.push(date);
                    
                    i++;
                }catch(error:any){
          
                  console.log(error)
                    setPrices(xArray);
                    setDates(yArray);
                    setName(data[x]['name'])
                  
                    break;
                }
            }  
        }
      }catch{
          break;
      }
      x++;
  }
  if(Object.keys(data).length != 0){
    setLoading(true);
    }

}, [data])

console.log(prices)
const data2 = {
    labels: dates,
    datasets: [
      {
        label: name + " cena",
        data: prices,
        fill: true,
        borderColor: "rgba(75,192,192,1)"
      }
    ]
    // options: {
    //   sclaes: {
    //     yAxes: [{
    //       ticks: {
    //         precision: 10
    //       }
    //     }]
    //   }
    // }
  };


  if(!loading){
    return(<SMiddle><ReactLoading color="black" type="bars"/></SMiddle>)
}else{
    return ( <>
      <SDiv>
        <Line data={data2} />
      </SDiv>
      {Object.entries(data).map((coin) => {
        if(coin[1]['id'] === {id}.id){
          return(<><STable>
            <STr><th>Cena:</th><th>{coin[1]['current_price'] == undefined || coin[1]['current_price'] == null ? "Záznam chybí" : Number(coin[1]['current_price']).toLocaleString()} CZK</th></STr>
            <STr><th>Market Cap:</th><th>{coin[1]['market_cap'] == undefined || coin[1]['market_cap'] == null ? "Záznam chybí" : Number(coin[1]['market_cap']).toLocaleString()} CZK</th></STr>
            <STr><th>Volume:</th><th>{coin[1]['total_volume'] == undefined || coin[1]['total_volume'] == null ? "Záznam chybí" : Number(coin[1]['total_volume']).toLocaleString()} CZK</th></STr>
            <STr><th>Circulating supply:</th><th>{coin[1]['circulating_supply'] == undefined || coin[1]['circulating_supply'] == null ? "Záznam chybí" : Number(coin[1]['circulating_supply']).toLocaleString()} CZK</th></STr>
            <STr><th>All time high:</th><th>{coin[1]['ath'] == undefined || coin[1]['ath'] == null ? "Záznam chybí" : Number(coin[1]['ath']).toLocaleString()} CZK</th></STr>
            <STr><th>Oblíbenost:</th><th>#{coin[1]['market_cap_rank'] == undefined || coin[1]['market_cap_rank'] == null ? "Záznam chybí" : coin[1]['market_cap_rank']}</th></STr>
            <STr><th>24h:</th><STh percentage={coin[1]['price_change_percentage_24h']}>{coin[1]['price_change_percentage_24h']}%</STh></STr>
          </STable><tfoot></tfoot></>)
        }
      })}
      <p></p>
      <SButtonBack onClick={() => {history.push("/cryptoList/page" + {page}.page)}}>Zpět</SButtonBack>
      </>)
} 
}

export default Chart