import React from 'react'
import {
    CoinContainer,
    CoinRow,
    SCoin,
    CoinH1,
    CoinImg,
    CoinSymbol,
    CoinData,
    CoinVolume,
    CoinMarketcap,
    Red,
    Green,
    CoinPrice
} from '../src/styles/coin'

const Coin = ({name, image, symbol, price, volume, priceChange, marketcap}) => {
    return (
        <CoinContainer>
            <CoinRow>
                <SCoin>
                    <CoinImg src={image} alt="crtypto"/>
                    <CoinH1>{name}</CoinH1>
                    <CoinSymbol>{symbol}</CoinSymbol>
                </SCoin>
                <CoinData>
                    <CoinPrice>CZK {price}</CoinPrice>
                    <CoinVolume>CZK{volume}</CoinVolume>
                    {priceChange < 0 ? (
                        <Red>{priceChange.toFixed(2)}%</Red>
                    ) : (<Green>{priceChange.toFixed(2)}%</Green>)}
                    <CoinMarketcap>Mkt Cap: CZK {marketcap}</CoinMarketcap>
                </CoinData>
            </CoinRow>
        </CoinContainer>
    )
}

export default Coin
