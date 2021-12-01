import styled from 'styled-components'

export const SButton = styled.button`
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
  cursor: pointer;

:hover {
    background-color: #e7e7e7;
}
`



export const Conteiner = styled.div`
margin: auto;
width: 660px;
height: auto;
`

export const SLabel = styled.label`
color: teal;
font-weight: 500;
`

export const SInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`