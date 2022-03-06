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
    Red,
    Green,
    CoinMarketcap
} from '../styles/coin'

export const Coin = ({name, image, symbol, price, priceChange, marketcap}: {name: any, image: any, symbol: any, price: any, priceChange: any, marketcap: any}) => {
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
