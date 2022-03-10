import styled from 'styled-components'

export const SDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 15px; 

  p {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  }
  p.active {
  background-color: #4CAF50;
  color: white;
}
  p:hover:not(.active) {background-color: #ddd;}

  @media (max-width: 460px){
  width: auto;
  margin-left: 100px;
  }
`