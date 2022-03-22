import styled from 'styled-components'

export const GraphTable = styled.div`
display: flex;
  align-items: center;
  color: black;
  text-decoration: none;
  float: right;
  padding: 0px 16px;
  p{
    padding-right: 10px;
    padding-left: 10px;
    cursor: pointer;

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











export const STable = styled.table`
margin-left: 80px;
text-align: left;
border-collapse: collapse;
width: 90%;
font-size: 25px;
@media (max-width: 1300px){
  margin-left: 40px;
  }
`

export const STr = styled.tr`
border-bottom: 1px solid black;
height: 50px;
:hover{
    background-color: #E0E0E0;
}
`

type Props = {
    percentage: number;
  };


  export const STh = styled.th<Pick<Props, 'percentage'>>`
  color: ${({percentage}) => (percentage >= 0 ? "green" : "red")};
  
  `