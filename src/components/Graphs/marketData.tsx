import axios from 'axios'
import moment from 'moment'


const formatSparkline = (numbers:any) => {
  const sevenDaysAgo = moment().subtract(7, 'days').unix();
  let formattedSparkline = numbers.map((item:any, index: any) => {
      return {
          x: sevenDaysAgo + (index + 1) * 3600,
          y: item,
      }
  })
  return formattedSparkline;
}

const formatMarketData = (data:any) => {
    let formattedData: any = [];

    data.forEach((item: any) => {
        const formattedSparkline = formatSparkline(item.sparkline_in_7d.price)

        const formattedItem = {
            ...item,
            sparkline_in_7d: {
                price: formattedSparkline
            }
        }
        formattedData.push(formattedItem);
    })

    return formattedData;
}

export const getMarketData = async () => {
  try{
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=czk&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y')
    const data = response.data;
    const formattedResponse = formatMarketData(data);
    return formattedResponse;
  }catch(error: any) {
    console.log(error.message)
  }
}