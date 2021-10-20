import styled from 'styled-components'

export const CoinContainer = styled.div`
display: flex;
justify-content: center;
`

export const CoinRow = styled.div`
display : flex;
flex-direction: row;
justify-items: start;
align-items: center;
height: 80px;
border-bottom: 1px solid #d7d7d7;
width: 900px;
color: black;
`

export const SCoin = styled.div`
display: flex;
align-items: center;
padding-right: 24px;
min-width: 300px;
`

export const CoinH1 = styled.h1`
font-size: 16px;
width: 150px;
`

export const CoinImg = styled.img`
height: 30px;
width: 30px;
margin-right: 10px;
`

export const CoinSymbol = styled.p`
text-transform: uppercase;
`
export const CoinData = styled.div`
display: flex;
text-align: center;
justify-content: space-between;
width: 100%;
`

export const CoinPrice = styled.p`
width: 155px;
`

export const CoinVolume = styled.p`
width: 230px;
`

export const  CoinMarketcap = styled.p`
width: 155px;
`


export const Red = styled.p`
width: 100%;
color: #f00606;
`

export const Green = styled.p`
width: 100%;
color: #11d811;
`


export const SCoinApp = styled.div`
  display: flex; flex-direction: colun;
  align-items: center;
  margin-top: 64px;
  color: #fff;
`

export const SCoinSearch = styled.div`
  margin-bottom: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const SCoinText = styled.div`
  margin-bottom: 32px;
  text-align: center;
`

export const SCoinInput = styled.input`
padding-left: 16px;
width: 300px;
height: 50px;
border-radius: 4px;
border: none;
background-color: black;
color: #e2e2e2;
::placeholder {
    color: #e2e2e2;
}
`






const MainTitle = styled.h1`
margin-left: 10%;
padding-top: 10%;
font-size: 6rem;
text-align: left;
color: black;
`
const MainTitle2 = styled.h1`
margin-top: -2%;
margin-left: 10%;
font-size: 6rem;
text-align: left;
color: black;
`

const BitCoinImage = styled.img`
width: 500px;
display: block;
margin-top: 7%;
margin-right: 15%;
float: right;
`
const STable = styled.table`
margin-left: 5%;
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 90%;
`

export const STd = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`

export const STr = styled.tr`
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: black;
`