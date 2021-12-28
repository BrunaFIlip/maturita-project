import styled from 'styled-components'
import {colors} from '../styles/color'

export const SSideBar = styled.div`
margin-left: -8px;
height: 100vh;
width: 250px;
background-color: ${colors.gr};
margin-top: -1.13%;
position: absolute;
`

export const SUl = styled.ul`
list-style-type: none;
  margin: 0;
  padding: 0;
  width: 20%;
  background-color: ${colors.darkGr};
  position: fixed;
  height: 100%;
  overflow: auto;  
  padding-top: 6%;
  @media (max-width: 1300px){
    width: 250px;
    padding-top: 80px
  }

.row{
width: 100%;
height: 60px;
list-style-type: none;
margin: 0%;
display: flex;
flex-direction: row;
color: ${colors.wh};
justify-content: center;
align-items: center;
}

.row:hover{
    cursor: pointer;
    background-color: ${colors.gr};
}
`
export const SIcon = styled.div`
flex: 30%;
display: grid;
place-items: center;
`

export const STitle = styled.div`
flex: 50%;
`

export const SHamburger = styled.div`
position: absolute;
color: ${colors.wh};
z-index: 10;
margin-top: 8px;
`