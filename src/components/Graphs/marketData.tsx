import axios from 'axios'
import moment from 'moment'


const formatSparkline = (numbers:any, usdToCzk:number) => {
  const sevenDaysAgo = moment().subtract(7, 'days').calendar();
  let formattedSparkline = numbers.map((item:any, index: any) => {
      return {
          x: moment(sevenDaysAgo).add(index + 1, 'hours').format("D.M, h a"),
          y: item * usdToCzk,
      }
  })
  return formattedSparkline;
}

const formatMarketData = (data:any, usdToCzk:number) => {
    let formattedData: any = [];
    let twelveHours = 0;

    data.forEach((item: any) => {
        const formattedSparkline = formatSparkline(item.sparkline_in_7d.price, usdToCzk)
        
        if(twelveHours === 11){
        const formattedItem = {
            ...item,
            sparkline_in_7d: {
                price: formattedSparkline
            }
        }
        formattedData.push(formattedItem);
        twelveHours = -1;
      }
      twelveHours++;
    })

    return formattedData;
}
const formatMarketInfoData = (data:any, usdToCzk:number) => {
  let formattedData: any = [];

  Object.entries(data.market_data).map((value:any) => {
    if(value[0] == "sparkline_7d"){

      const formattedSparkline = formatSparkline(value[1]['price'], usdToCzk)

 
      const formattedItem = {
          ...data,
          market_data_formated: {
            sparkline_7d: {
              price: formattedSparkline
          },
        }
      }
      formattedData.push(formattedItem);
    }
  

  })

  return formattedData;
}

export const getMarketDataList = async (page:string) => {
  let formatedData:any
  const getCoins1 = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=czk&order=market_cap_rank&per_page=250&page='+page+'&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y').then((value) => {
    formatedData = value.data
})
return formatedData
}

export const getMarketDataChart = async (page:string) => {
  let curr:any
  await axios.get("https://api.currencyapi.com/v3/latest?apikey=a9da5980-9586-11ec-acb5-adef3790cfd2").then((value) => {
    curr = value.data.data.CZK.value
  })
  let formatedData:any
  await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=czk&order=market_cap_rank&per_page=250&page='+page+'&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y').then((value) => {
    formatedData = formatMarketData(value.data, curr)
})
    return formatedData;
}

export const getMarketDataInfoChart = async (id:string) => {
  let curr:any
  let tenD:any
  let fiveteenD:any
  let thirtyD:any
  let sixtyD:any
  let ninetyD:any
  let year:any
  await axios.get("https://api.currencyapi.com/v3/latest?apikey=a9da5980-9586-11ec-acb5-adef3790cfd2").then((value) => {
    curr = value.data.data.CZK.value
  })
  let formatedData:any
  await axios.get('https://api.coingecko.com/api/v3/coins/'+id+'?tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=true').then((value) => {
    formatedData = formatMarketInfoData(value.data, curr)
})
await axios.get('https://api.coingecko.com/api/v3/coins/'+id+'/market_chart?vs_currency=czk&days=30&interval=daily').then((value) => {
  thirtyD = value.data.prices
})
await axios.get('https://api.coingecko.com/api/v3/coins/'+id+'/market_chart?vs_currency=czk&days=15&interval=daily').then((value) => {
  fiveteenD = value.data.prices
})
await axios.get('https://api.coingecko.com/api/v3/coins/'+id+'/market_chart?vs_currency=czk&days=10&interval=daily').then((value) => {
  tenD = value.data.prices
})
await axios.get('https://api.coingecko.com/api/v3/coins/'+id+'/market_chart?vs_currency=czk&days=60&interval=daily').then((value) => {
  sixtyD = value.data.prices
})
await axios.get('https://api.coingecko.com/api/v3/coins/'+id+'/market_chart?vs_currency=czk&days=90&interval=daily').then((value) => {
  ninetyD = value.data.prices
})
await axios.get('https://api.coingecko.com/api/v3/coins/'+id+'/market_chart?vs_currency=czk&days=365&interval=daily').then((value) => {
  year = value.data.prices
})
    return {formatedData, thirtyD, fiveteenD, tenD, sixtyD, ninetyD, year};
}

export const getMarketData = async (url:string) => {
    const getCoins1 = await axios.get('https://api.coingecko.com/api/v3/simple/price?'+url+'&vs_currencies=czk')

    const formatedData:any = [];
  axios.all([getCoins1]).then(
    axios.spread((...allData) => {
      formatedData.push(allData[0].data)
      
    }
    ))
    return formatedData;

}