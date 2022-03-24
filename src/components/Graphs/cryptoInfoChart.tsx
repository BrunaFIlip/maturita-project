import React, {useState, useEffect} from 'react';
import { getMarketDataInfoChart } from './marketData';
import {Line} from 'react-chartjs-2'
import { SDiv } from '../../styles/popUpCharts';
import {useParams} from 'react-router-dom'
import { STable, STr, STh, GraphTable } from '../../styles/coinDetails';
import { SButtonBack } from '../../styles/newCrypto';
import { useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading'
import {SMiddle} from '../../styles/myCrypto'
import moment from 'moment';





const InfoChart = (props:string) => {
  const {id}: {id: string} = useParams();
  const [data, setData] = useState([]);
  const [prices, setPrices] = useState<any>([]);
  const [dates, setDates] = useState<any>([]);
  const [name, setName] = useState<string>();
  const [tenD, setTenD] = useState<any>({});
  const [fiveteenD, setFiveteenD] = useState<any>({});
  const [thirtyD, setThirtyD] = useState<any>({});
  const [sixtyD, setSixtyD] = useState<any>({});
  const [ninetyD, setNinetyD] = useState<any>({});
  const [year, setYear] = useState<any>({});
  const[loading, setLoading] = useState(false)
  const [days, setDays] = useState<number>(7);

  
  const history = useHistory();

  
useEffect(() => {
    const fetchMarketData = async () => {
        const marketData = await getMarketDataInfoChart({id}.id);
        setData(marketData.formatedData);
        setTenD(marketData.tenD)
        setFiveteenD(marketData.fiveteenD)
        setThirtyD(marketData.thirtyD)
        setSixtyD(marketData.sixtyD)
        setNinetyD(marketData.ninetyD)
        setYear(marketData.year)
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


let data2 = {
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


  //nastavuji data v grafu podle toho na určité období
const setGraphValues = (days:number) => {
  var index = 0;
  let pricesHelp:any = [];
  let datesHelp:any = [];

  if(days === 7){
    data2 = {
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
  }else if(days === 10){
    Object.entries(tenD).map((value) => {
      let phelp:any = value[1];
      let dhelp:any = value[1];
    
      pricesHelp.push(phelp[1])
      datesHelp.push(dhelp[0])
    })
    datesHelp.forEach((element:any) => {
      const daysAgo = moment().subtract(10, 'days').calendar();
      element = moment(daysAgo).add(index, 'days').format("D.M.YY")
      datesHelp[index] = element
    index++;
    });
   data2 = {
      labels: datesHelp,
      datasets: [
        {
          label: name + " cena",
          data: pricesHelp,
          fill: true,
          borderColor: "rgba(75,192,192,1)"
       }
      ]
    };
  }else if(days === 15){
    Object.entries(fiveteenD).map((value) => {
      let phelp:any = value[1];
      let dhelp:any = value[1];
    
      pricesHelp.push(phelp[1])
      datesHelp.push(dhelp[0])
    })
    datesHelp.forEach((element:any) => {
      const daysAgo = moment().subtract(15, 'days').calendar();
      element = moment(daysAgo).add(index, 'days').format("D.M.YY")
      datesHelp[index] = element
    index++;
    });
   data2 = {
      labels: datesHelp,
      datasets: [
        {
          label: name + " cena",
          data: pricesHelp,
          fill: true,
          borderColor: "rgba(75,192,192,1)"
       }
      ]
    };
  }else if(days === 30){
    Object.entries(thirtyD).map((value) => {
      let phelp:any = value[1];
      let dhelp:any = value[1];
    
      pricesHelp.push(phelp[1])
      datesHelp.push(dhelp[0])
    })
    datesHelp.forEach((element:any) => {
      const daysAgo = moment().subtract(30, 'days').calendar();
      element = moment(daysAgo).add(index, 'days').format("D.M.YY")
      datesHelp[index] = element
    index++;
    });
    data2 = {
      labels: datesHelp,
     datasets: [
        {
          label: name + " cena",
          data: pricesHelp,
          fill: true,
          borderColor: "rgba(75,192,192,1)"
        }
      ]
    };
  }else if(days === 60){
    Object.entries(sixtyD).map((value) => {
      let phelp:any = value[1];
      let dhelp:any = value[1];
    
      pricesHelp.push(phelp[1])
      datesHelp.push(dhelp[0])
    })
    datesHelp.forEach((element:any) => {
      const daysAgo = moment().subtract(60, 'days').calendar();
      element = moment(daysAgo).add(index, 'days').format("D.M.YY")
      datesHelp[index] = element
    index++;
    });
    data2 = {
      labels: datesHelp,
      datasets: [
        {
          label: name + " cena",
          data: pricesHelp,
          fill: true,
          borderColor: "rgba(75,192,192,1)"
        }
      ]
    };
  }else if(days === 90){
    Object.entries(ninetyD).map((value) => {
      let phelp:any = value[1];
      let dhelp:any = value[1];
    
      pricesHelp.push(phelp[1])
      datesHelp.push(dhelp[0])
    })
    datesHelp.forEach((element:any) => {
      const daysAgo = moment().subtract(90, 'days').calendar();
      element = moment(daysAgo).add(index, 'days').format("D.M.YY")
      datesHelp[index] = element
    index++;
    });
    data2 = {
      labels: datesHelp,
      datasets: [
        {
          label: name + " cena",
          data: pricesHelp,
          fill: true,
          borderColor: "rgba(75,192,192,1)"
        }
      ]
    };
 }else if(days === 365){
   var monthly = 0;
  Object.entries(year).map((value) => {
    if(monthly == 0){
      let phelp:any = value[1];
      let dhelp:any = value[1];
      pricesHelp.push(phelp[1])
      datesHelp.push(dhelp[0])
    }
    else if(monthly === 29){
      monthly = -1;
    }
    monthly++;
  })
  datesHelp.forEach((element:any) => {
    const monthsAgo = moment().subtract(12, 'months').calendar();
    element = moment(monthsAgo).add(index, 'months').format("D.M.YY")
    datesHelp[index] = element
  index++;
  });

    data2 = {
      labels: datesHelp,
      datasets: [
        {
           label: name + " cena",
          data: pricesHelp,
          fill: true,
           borderColor: "rgba(75,192,192,1)"
        }
      ]
    };
  }
}


  setGraphValues(days);

  if(!loading){
    return(<SMiddle><ReactLoading color="black" type="bars"/></SMiddle>)
}else{
    return ( <>
      <SDiv>
        <Line data={data2} />
          <GraphTable>
            <p className={days === 7 ? "active" : ""} onClick={() => setDays(7)}>7 dní</p>
            <p className={days === 10 ? "active" : ""} onClick={() => setDays(10)}>10 dní</p>
            <p className={days === 15 ? "active" : ""} onClick={() => setDays(15)}>15 dní</p>
            <p className={days === 30 ? "active" : ""} onClick={() => setDays(30)}>30 dní</p>
            <p className={days === 60 ? "active" : ""} onClick={() => setDays(60)}>60 dní</p>
            <p className={days === 90 ? "active" : ""} onClick={() => setDays(90)}>90 dní</p>
            <p className={days === 365 ? "active" : ""} onClick={() => setDays(365)}>1 rok</p>
          </GraphTable>
      </SDiv>
          <><STable>
            <STr><th>Cena:</th><th>{data[0]['market_data']['current_price']['czk'] == undefined || data[0]['market_data']['current_price']['czk'] == null ? "Záznam chybí" : Number(data[0]['market_data']['current_price']['czk']).toLocaleString() + " CZK"}</th></STr>
            <STr><th>Market Cap:</th><th>{data[0]["market_data"]['market_cap']["czk"] == undefined || data[0]["market_data"]['market_cap']["czk"] == null ? "Záznam chybí" : Number(data[0]["market_data"]['market_cap']["czk"]).toLocaleString() + " CZK"}</th></STr>
            <STr><th>Volume:</th><th>{data[0]['market_data']['fully_diluted_valuation']['czk'] == undefined || data[0]['market_data']['fully_diluted_valuation']['czk'] == null ? "Záznam chybí" : Number(data[0]['market_data']['fully_diluted_valuation']['czk']).toLocaleString() + " CZK"}</th></STr>
            <STr><th>Circulating supply:</th><th>{data[0]["market_data"]['circulating_supply'] == undefined || data[0]["market_data"]['circulating_supply'] == null ? "Záznam chybí" : Number(data[0]["market_data"]['circulating_supply']).toLocaleString() + " CZK"}</th></STr>
            <STr><th>All time high:</th><th>{data[0]["market_data"]['ath']["czk"] == undefined || data[0]["market_data"]['ath']["czk"] == null ? "Záznam chybí" : Number(data[0]["market_data"]['ath']["czk"]).toLocaleString() + " CZK"}</th></STr>
            <STr><th>Oblíbenost:</th><th>#{data[0]['market_cap_rank'] == undefined || data[0]['market_cap_rank'] == null ? "Záznam chybí" : data[0]['market_cap_rank']}</th></STr>
            <STr></STr>
            <STr><th>24 hodin:</th><STh percentage={data[0]["market_data"]['price_change_percentage_24h']}>{data[0]["market_data"]['price_change_percentage_24h'] + "%"}</STh></STr>
            <STr><th>7 dní:</th><STh percentage={data[0]["market_data"]['price_change_percentage_7d']}>{data[0]["market_data"]['price_change_percentage_7d'] + "%"}</STh></STr>
            <STr><th>30 dní:</th><STh percentage={data[0]["market_data"]['price_change_percentage_30d']}>{data[0]["market_data"]['price_change_percentage_30d'] + "%"}</STh></STr>
            <STr><th>60 dní:</th><STh percentage={data[0]["market_data"]['price_change_percentage_60d']}>{data[0]["market_data"]['price_change_percentage_60d'] + "%"}</STh></STr>
            <STr><th>200 dní:</th><STh percentage={data[0]["market_data"]['price_change_percentage_200d']}>{data[0]["market_data"]['price_change_percentage_200d'] + "%"}</STh></STr>
            <STr><th>1 rok:</th><STh percentage={data[0]["market_data"]['price_change_percentage_1y']}>{data[0]["market_data"]['price_change_percentage_1y'] + "%"}</STh></STr>
          </STable><tfoot></tfoot></>

      <p></p>
      <SButtonBack onClick={() => {history.push("/portfolio")}}>Zpět</SButtonBack>
      </>)
} 
}

export default InfoChart