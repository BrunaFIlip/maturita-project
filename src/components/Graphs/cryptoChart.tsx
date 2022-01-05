import React, {useState, useEffect} from 'react';
import { getMarketData } from './marketData';
import {Line} from 'react-chartjs-2'
import { SDiv } from '../../styles/popUpCharts';
import {useParams} from 'react-router-dom'
import moment from 'moment';
import { isFunctionDeclaration, isTemplateTail } from 'typescript';
import { ConstructionOutlined } from '@mui/icons-material';


const Chart = (props:any) => {
const {id}: {id: string} = useParams();
const [data, setData] = useState([]);
const [prices, setPrices] = useState([]);
const [dates, setDates] = useState([]);
const [name, setName] = useState<string>();

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


    return ( 
        <SDiv>
    <Line data={data2} />
    </SDiv>)
  
}

export default Chart