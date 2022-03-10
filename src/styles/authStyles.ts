import styled from 'styled-components'
import {colors} from '../styles/color'

export const SErrorText = styled.small`
color: red;
`


export const UserBox = styled.div`
    position: relative;
`

export const SLable = styled.label`
        position: absolute;
        top:0;
        left: 0;
        padding: 10px 0;
        font-size: 16px;
        color: ${colors.wh};
        pointer-events: none;
        transition: .5s;

`

export const SInput = styled.input`
        width: 100%;
        padding: 10px 0;
        font-size: 16px;
        color: ${colors.wh};
        margin-bottom: 30px;
        border: none;
        border-bottom: 1px solid ${colors.wh};
        outline: none;
        background: transparent;
    :focus ~ label,
    :valid ~ label {
        top: -20px;
        left: 0;
        color: ${colors.darkGr};
        font-size: 12px;
      }
`

export const STable = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    padding: 40px;
    transform: translate(-50%, -50%);
    background: ${colors.darkGr};
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0,0,0,.6);
    border-radius: 10px;
`
export const SH1 = styled.h1`
text-align: center;
color: ${colors.wh};
`


export const SButton = styled.button`
    background-color: ${colors.wh};
    color: ${colors.bl};
    border: 2px solid #e7e7e7;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  width: 100%;
:hover {
    background-color: #e7e7e7;
}
`


export const SP = styled.p`
text-align: center;
color: ${colors.wh};
font-size: medium;
a{
    color: white;
}
`