import React, {useState, useEffect} from 'react';
import { getMarketDataChart } from './marketData';
import {Line} from 'react-chartjs-2'
import { SDiv } from '../../styles/popUpCharts';
import {useParams} from 'react-router-dom'
import { STable, STr, STh } from '../../styles/coinDetails';
import { SButtonBack } from '../../styles/newCrypto';




const Chart = (props:any) => {
  const {id}: {id: string} = useParams();
  const {page}: {page: string}  = useParams();
  const [data, setData] = useState([]);
  const [prices, setPrices] = useState([]);
  const [dates, setDates] = useState<any>([]);
  const [name, setName] = useState<string>();
  

  
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
                    const pr = data[x]['sparkline_in_7d']['price'][i]['x'];
                    xArray.push(pr);
                    const date = new Date(data[x]['sparkline_in_7d']['price'][i]['y']);

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

}, [data])


const data2 = {
    labels: prices,
    datasets: [
      {
        label: name + " cena",
        data: dates,
        fill: true,
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };
  console.log(Number(dates))


    return ( <>
      <SDiv>
        <Line data={data2} />
      </SDiv>
      {Object.entries(data).map((coin) => {
        if(coin[1]['id'] === {id}.id){
          return(<STable>
            <STr><th>Cena:</th><th>{coin[1]['current_price'] == undefined || coin[1]['current_price'] == null ? "Záznam chybí" : coin[1]['current_price']} CZK</th></STr>
            <STr><th>Market Cap:</th><th>{coin[1]['market_cap'] == undefined || coin[1]['market_cap'] == null ? "Záznam chybí" : coin[1]['market_cap']} CZK</th></STr>
            <STr><th>Volume:</th><th>{coin[1]['total_volume'] == undefined || coin[1]['total_volume'] == null ? "Záznam chybí" : coin[1]['total_volume']} CZK</th></STr>
            <STr><th>Circulating supply:</th><th>{coin[1]['circulating_supply'] == undefined || coin[1]['circulating_supply'] == null ? "Záznam chybí" : coin[1]['circulating_supply']} CZK</th></STr>
            <STr><th>All time high:</th><th>{coin[1]['ath'] == undefined || coin[1]['ath'] == null ? "Záznam chybí" : coin[1]['ath']} CZK</th></STr>
            <STr><th>Oblíbenost:</th><th>#{coin[1]['market_cap_rank'] == undefined || coin[1]['market_cap_rank'] == null ? "Záznam chybí" : coin[1]['market_cap_rank']}</th></STr>
            <STr><th>24h:</th><STh percentage={coin[1]['price_change_percentage_24h']}>{coin[1]['price_change_percentage_24h']}%</STh></STr>
          </STable>)
        }
      })}
      <p></p>
      <SButtonBack onClick={() => {window.location.pathname = "/cryptoList/page" + {page}.page}}>Zpět</SButtonBack>
      </>)
  
}

export default Chart