import styled from 'styled-components'


export const SRec = styled.div`
border: black;
border-style: solid;
border-width: 1px;
padding: 10px;

`

export const SPie = styled.div`
width: 15%;
font-size: 7px;
position: relative;
left: 80%;
margin-top: -95px;
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
  @media (max-width: 480px){
    width: 120px;
    left: 55%
  }
  @media (max-width: 400px){
    width: 100px;
    left: 64%
  }
  @media (max-width: 350px){
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

export const FavouriteButton = styled.button`
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
  @media (max-width: 580px){
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

:hover {
    background-color: #e7e7e7;
}
`