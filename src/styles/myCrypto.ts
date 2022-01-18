import styled from 'styled-components'
import {colors} from '../styles/color'



export const SRec = styled.div`
/* border: black;
border-style: solid;
border-width: 1px;
padding: 10px; */

color: white;
float: left;
width: 300px;
height: auto;
/* background-color: #00008C; */
background-color: #000033;
border-radius: 25px;
padding: 10px;
margin: 5px;
position: relative;
`

export const SMainRec = styled.div`
border-bottom: 4px solid ${colors.gr};
border-top: 4px solid ${colors.gr};
padding: 10px; 
`

export const SPie = styled.div`
width: 15%;
font-size: 7px;
position: relative;
left: 80%;
margin-top: -130px;
@media (min-width: 1921px){
    width: 220px;
  }
@media (max-width: 1300px){
    width: 150px;
  }
  @media (max-width: 900px){
    width: 150px;
    left: 60%
  }
  @media (max-width: 530px){
    visibility: hidden;
  }
`

export const SH1 = styled.h1`
  @media (max-width: 580px){
    text-align: center;
  }

`


export const SButtonAdd = styled.button`
    background-color: white;
    color: black;
    border: 2px solid #e7e7e7;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  width: 200px;
  transition-duration: 0.4s;
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

export const SButtonDelete = styled.button`
    background-color: white;
    color: black;
    border: 2px solid #e7e7e7;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  width: 200px;
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


export const SValueProcent = styled.div`
#idValue{
  display: block;
}
#idProcent{
  display: block;
}
`
type Props = {
  isFavourite: number;
}

export const FavouriteButton = styled.div<Pick<Props, 'isFavourite'>>`
color: ${({isFavourite}) => (isFavourite == 0 ? "white" : "yellow")};
position: absolute;
    top: 20px;
    right: 20px;
}
}
`