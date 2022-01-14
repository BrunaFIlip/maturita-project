import React, {useState, useEffect} from 'react';
import { getMarketData } from './marketData';
import {Line} from 'react-chartjs-2'
import { SDiv } from '../../styles/popUpCharts';
import {useParams} from 'react-router-dom'
import { STable, STr, STh } from '../../styles/coinDetails';
import { SButtonBack } from '../../styles/newCrypto';



const Chart = (props:any) => {
const {id}: {id: string} = useParams();
const [data, setData] = useState([]);
const [prices, setPrices] = useState([]);
const [dates, setDates] = useState([]);
const [name, setName] = useState<string>();


useEffect(() => {
    const fetchMarketData = async () => {
        const marketData = await getMarketData();
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
        if(data[x]['id'] == {id}.id){
            while(true){
                try{
                    const nevim = data[x]['sparkline_in_7d']['price'][i]['x'];
                    xArray.push(nevim);
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


    return ( <>
      <SDiv>
        <Line data={data2} />
      </SDiv>
      {Object.entries(data).map((coin) => {
        if(coin[1]['id'] == {id}.id){
          return(<STable>
            <STr><th>Cena:</th><th>{coin[1]['current_price']} CZK</th></STr>
            <STr><th>Market Cap:</th><th>{coin[1]['market_cap']} CZK</th></STr>
            <STr><th>Volume:</th><th>{coin[1]['total_volume']} CZK</th></STr>
            <STr><th>Circulating supply:</th><th>{coin[1]['circulating_supply']} CZK</th></STr>
            <STr><th>All time high:</th><th>{coin[1]['ath']} CZK</th></STr>
            <STr><th>Oblíbenost:</th><th>#{coin[1]['market_cap_rank']}</th></STr>
            <STr><th>24h:</th><STh percentage={coin[1]['price_change_percentage_24h']}>{coin[1]['price_change_percentage_24h']}%</STh></STr>
          </STable>)
        }
      })}
      <p></p>
      <SButtonBack onClick={() => {window.location.pathname = "/cryptoList"}}>Zpět</SButtonBack>
      </>)
  
}

export default Chart