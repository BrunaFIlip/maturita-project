import styled from 'styled-components'
import {colors} from '../styles/color'

type Props = {
  isFavourite: number;
}

export const SMiddle = styled.div`
div{
  margin: auto;
  margin-top: 25%;
}
`

export const SRec = styled.div`
  cursor: pointer;
h2{
  padding-top: 25px;
  margin-bottom: -5px;

  svg{
    margin-bottom: -3px;
  }
}


color: white;
float: left;
min-width: 300px;
height: auto;

background-color: #000033;
border-radius: 25px;
padding: 10px;
margin: 5px;
position: relative;
max-width: 450px;
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


export const FavouriteButton = styled.div<Pick<Props, 'isFavourite'>>`
color: ${({isFavourite}) => (isFavourite === 0 ? "white" : "yellow")};
position: absolute;
    top: 20px;
    right: 20px;
}
}
cursor: pointer;
`

export const DeleteButton = styled.div`
position: absolute;
    top: 20px;
cursor: pointer;
`

export const ShowPercentage = styled.p`
text-align: right;
margin-top: -49px;
@media (max-width: 530px){
  position: relative;
    float: left;
    margin-top: 0;
  }
`

export const Logo = styled.img`
width: 12%;
font-size: 7px;
position: relative;
left: 75%;
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
export const SP = styled.p`
overflow-wrap: break-word;
color: 	#ff9966;
`