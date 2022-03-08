import styled from 'styled-components'

export const SNewPortfolioButton = styled.button`
  background-color: white;
  color: black;
  border: 2px solid #e7e7e7;
  padding: 20px 40px;
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 20px;
  margin: auto;
  width: 50%;
  float: center;
  margin-top: 25%;

  transition-duration: 0.4s;
  cursor: pointer;

  :hover {
    background-color: #e7e7e7;
}
`

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

export const SButtonBack = styled.button`
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
  margin-left: 38%;
  width: 200px;
  @media (max-width: 700px){
    margin-left: 25%;
  }
  @media (max-width: 580px){
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

:hover {
    background-color: #e7e7e7;
}
`



export const Conteiner = styled.div`
margin: auto;
width: 660px;
height: auto;
@media (max-width: 700px){
  width: auto;
}
`

export const SLabel = styled.label`
color: teal;
font-size: 20px;
`
export const SLabel2 = styled.label`
color: teal;
font-size: 20px;
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

export const SP = styled.p`
color: black;
font-size: 19px;
margin-top: 0;
`