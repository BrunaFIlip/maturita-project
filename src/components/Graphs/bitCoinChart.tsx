import React, {useState, useEffect} from 'react';
import { getMarketData } from './marketData';
import {Line} from 'react-chartjs-2'
import { SDiv } from '../../styles/popUpCharts';
import moment from 'moment';




const BitCoinChart = () => {
const [data, setData] = useState([]);
const [bitCoinPrices, setBitCoinPrices] = useState([]);
const [bitCoinDates, setBitCoinDates] = useState([]);

//daát to mimo a zavolat to v useeffectu
//truhá metoda je lepší, použít dva useeffecty a ten druhý zavolat když se změní data

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

  while(true){
      try{
          const nevim = data[0]['sparkline_in_7d']['price'][i]['x'];
          xArray.push(nevim);
          const nevim2 = data[0]['sparkline_in_7d']['price'][i]['y'];
          yArray.push(nevim2);
          i++;
      }catch(error:any){
        console.log(error)
          setBitCoinPrices(xArray);
          setBitCoinDates(yArray);
        
          break;
      }
  }     
}, [data])

console.log(data)
const data2 = {
    labels: bitCoinPrices,
    datasets: [
      {
        label: "BitCoin cena",
        data: bitCoinDates,
        fill: true,
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };


    return (    <SDiv>
    <Line data={data2}/>
  </SDiv>)
  
}

export default BitCoinChart