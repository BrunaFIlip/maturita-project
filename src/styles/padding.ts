import styled from 'styled-components'


export const Padding = styled.div`
padding-left: 22%;
padding-top: 3.4%;
padding-right: 2%;
@media (max-width: 1300px){
    padding-left: 2%;
    padding-top: 70px;
  }
`

export const Font = styled.div`
font-family: 'Sora', sans-serif;
color: black;
`
export const Background = styled.div`
background-image: url("/blur_graph.jpg");
min-height: 100%;
min-width: 100%;

width: 100%;
height: auto; 

position: fixed;

top: 0;
left: 0;
z-index: -1;
`