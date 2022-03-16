import styled from 'styled-components'
import {colors} from "../styles/color"


export const SH1 = styled.h1`
text-align: center;
font-size: 100px;
color: white;
`

export const BlackDiv = styled.div`
*{
    margin: -8px;
    padding: 20px;
}
margin-left: -8px;
padding-right: 16px;
width: 100%;
background-color: ${colors.bl};
`


export const SP = styled.p`
margin:7px;
margin-top: -35px;
padding-bottom: 80px;
color: ${colors.wh};
font-size: 20px;
text-align: center;
`

export const GrayDiv = styled.div`
margin-left: -8px;
padding-right: 8px;
width: 100%;
background-color: ${colors.gr};
margin-top: -7px;
text-align: center;
`


export const SButton = styled.button`
margin: 20px;
    background-color: white;
    color: black;
    border: 2px solid #e7e7e7;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
  width: 250px;
  cursor: pointer;
  @media (max-width: 580px){
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

:hover {
    background-color: #e7e7e7;
}
`
export const SButtonRed = styled.button`
margin: 20px;
    background-color: red;
    color: black;
    border: 2px solid #e7e7e7 black;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
  width: 200px;
  cursor: pointer;
  @media (max-width: 580px){
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

:hover {
    background-color: orange;
}
`