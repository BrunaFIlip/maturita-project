import React, {useState, useEffect} from 'react';
import { getMarketDataInfoChart } from './marketData';
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
        const marketData = await getMarketDataInfoChart({id}.id);
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
                    const pr = data[0]['market_data_formated']['sparkline_7d']['price'][i]['y'];
                    xArray.push(pr);
                    const date = data[0]['market_data_formated']['sparkline_7d']['price'][i]['x'];

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

console.log(data)


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
  };


  if(!loading){
    return(<SMiddle><ReactLoading color="black" type="bars"/></SMiddle>)
}else{
    return ( <>
      <SDiv>
        <Line data={data2} />
      </SDiv>
          <><STable>
            <STr><th>Cena:</th><th>{data[0]['market_data']['current_price']['czk'] == undefined || data[0]['market_data']['current_price']['czk'] == null ? "Záznam chybí" : Number(data[0]['market_data']['current_price']['czk']).toLocaleString()} CZK</th></STr>
            <STr><th>Market Cap:</th><th>{data[0]["market_data"]['market_cap']["czk"] == undefined || data[0]["market_data"]['market_cap']["czk"] == null ? "Záznam chybí" : Number(data[0]["market_data"]['market_cap']["czk"]).toLocaleString()} CZK</th></STr>
            <STr><th>Volume:</th><th>{data[0]['market_data']['fully_diluted_valuation']['czk'] == undefined || data[0]['market_data']['fully_diluted_valuation']['czk'] == null ? "Záznam chybí" : Number(data[0]['market_data']['fully_diluted_valuation']['czk']).toLocaleString()} CZK</th></STr>
            <STr><th>Circulating supply:</th><th>{data[0]["market_data"]['circulating_supply'] == undefined || data[0]["market_data"]['circulating_supply'] == null ? "Záznam chybí" : Number(data[0]["market_data"]['circulating_supply']).toLocaleString()} CZK</th></STr>
            <STr><th>All time high:</th><th>{data[0]["market_data"]['ath']["czk"] == undefined || data[0]["market_data"]['ath']["czk"] == null ? "Záznam chybí" : Number(data[0]["market_data"]['ath']["czk"]).toLocaleString()} CZK</th></STr>
            <STr><th>Oblíbenost:</th><th>#{data[0]['market_cap_rank'] == undefined || data[0]['market_cap_rank'] == null ? "Záznam chybí" : data[0]['market_cap_rank']}</th></STr>
            <STr></STr>
            <STr><th>24 hodin:</th><STh percentage={data[0]["market_data"]['price_change_percentage_24h']}>{data[0]["market_data"]['price_change_percentage_24h']}%</STh></STr>
            <STr><th>7 dní:</th><STh percentage={data[0]["market_data"]['price_change_percentage_7d']}>{data[0]["market_data"]['price_change_percentage_7d']}%</STh></STr>
            <STr><th>30 dní:</th><STh percentage={data[0]["market_data"]['price_change_percentage_30d']}>{data[0]["market_data"]['price_change_percentage_30d']}%</STh></STr>
            <STr><th>60 dní:</th><STh percentage={data[0]["market_data"]['price_change_percentage_60d']}>{data[0]["market_data"]['price_change_percentage_60d']}%</STh></STr>
            <STr><th>200 dní:</th><STh percentage={data[0]["market_data"]['price_change_percentage_200d']}>{data[0]["market_data"]['price_change_percentage_200d']}%</STh></STr>
            <STr><th>1 rok:</th><STh percentage={data[0]["market_data"]['price_change_percentage_1y']}>{data[0]["market_data"]['price_change_percentage_1y']}%</STh></STr>
          </STable><tfoot></tfoot></>

      <p></p>
      <SButtonBack onClick={() => {history.push("/cryptoList/page"+page)}}>Zpět</SButtonBack>
      </>)
} 
}

export default Chart