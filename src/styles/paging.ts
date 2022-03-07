import styled from 'styled-components'

export const SDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 15px; 

  a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  }
  a.active {
  background-color: #4CAF50;
  color: white;
}
  a:hover:not(.active) {background-color: #ddd;}

  @media (max-width: 460px){
  width: auto;
  margin-left: 100px;
  }
`