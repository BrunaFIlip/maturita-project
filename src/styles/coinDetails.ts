import styled from 'styled-components'

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