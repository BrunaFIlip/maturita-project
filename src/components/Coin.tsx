import {useLayoutEffect, useState} from 'react'
import {
    CoinContainer,
    CoinRow,
    SCoin,
    CoinImg,
    CoinH1,
    CoinSymbol,
    CoinData,
    CoinPrice,
    Red,
    Green,
    CoinMarketcap
} from '../styles/coin'

const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }
export const Coin = ({name, image, symbol, price, priceChange, marketcap}: {name: any, image: any, symbol: any, price: any, priceChange: any, marketcap: any}) => {
    const [width] = useWindowSize();

    return (
        <CoinContainer>
<CoinRow>
<SCoin>
<CoinImg src={image} alt="crypto"/>
<CoinH1>{name}</CoinH1>
<CoinSymbol>{symbol}</CoinSymbol>
</SCoin>
<CoinData className='ahoj'>
    <CoinPrice>
        CZK{price}
    </CoinPrice>
    {priceChange < 0 ? (
        <Red>{priceChange != null ? priceChange.toFixed(2) + "%" : "Chybí záznam"}</Red>
    ) : (
        <Green>{priceChange != null ? priceChange.toFixed(2) + "%" : "Chybí záznam"}</Green>
    )
}
<CoinMarketcap>
    Mkt Cap: ${marketcap}
</CoinMarketcap>
</CoinData>
</CoinRow>
</CoinContainer>
    )
}
