import React from 'react'
import {
    CoinContainer,
    CoinRow,
    SCoin,
    CoinImg,
    CoinH1,
    CoinSymbol,
    CoinData,
    CoinPrice,
    CoinVolume,
    Red,
    Green,
    CoinMarketcap
} from '../styles/coin'

export const Coin = ({name, image, symbol, price, volume, priceChange, marketcap}: {name: any, image: any, symbol: any, price: any, volume: any, priceChange: any, marketcap: any}) => {
    return (
        <CoinContainer>
<CoinRow>
<SCoin>
<CoinImg src={image} alt="crypto"/>
<CoinH1>{name}</CoinH1>
<CoinSymbol>{symbol}</CoinSymbol>
</SCoin>
<CoinData>
    <CoinPrice>
        ${price}
    </CoinPrice>
    <CoinVolume>${volume}</CoinVolume>
    {priceChange < 0 ? (
        <Red>{priceChange.toFixed(2)}%</Red>
    ) : (
        <Green>{priceChange.toFixed(2)}%</Green>
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
