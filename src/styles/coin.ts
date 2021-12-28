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
@media (max-width: 1300px){
  width: auto;
  }
`

export const SCoin = styled.div`
display: flex;
align-items: center;
padding-right: 24px;
min-width: 300px;
@media (max-width: 1300px){
  min-width: auto;
  }
`

export const CoinH1 = styled.h1`
font-size: 16px;
width: 150px;
@media (max-width: 1300px){
  width: 100px;
  }
`

export const CoinImg = styled.img`
height: 30px;
width: 30px;
margin-right: 10px;
@media (max-width: 1300px){
  width: auto;
  }
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
@media (max-width: 1300px){
  width: auto;
  }
`


export const  CoinMarketcap = styled.p`
width: 155px;
@media (max-width: 1300px){
  width: auto;
  }
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
  display: flex; 
  flex-direction: column;
  align-items: center;
  color: #fff;
  margin-left: 6%;
  padding-top: 3.4%
  width: auto;
  @media (max-width: 1300px){
  width: auto;
  }
`

export const SCoinSearch = styled.div`
  margin-bottom: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 1300px){
  justify-content: left;
  }
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
  padding: 8px;
`

export const STr = styled.tr`
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: black;
`
