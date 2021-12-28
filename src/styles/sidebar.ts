import styled from 'styled-components'

export const SSideBar = styled.div`
margin-left: -8px;
height: 100vh;
width: 250px;
background-color: #2f4050;
margin-top: -1.13%;
position: absolute;
`

export const SUl = styled.ul`
list-style-type: none;
  margin: 0;
  padding: 0;
  width: 20%;
  background-color: #2f4050;
  position: fixed;
  height: 100%;
  overflow: auto;  
  padding-top: 3.4%;

.row{
width: 100%;
height: 60px;
list-style-type: none;
margin: 0%s;
display: flex;
flex-direction: row;
color: white;
justify-content: center;
align-items: center;
}

.row:hover{
    cursor: pointer;
    background-color: #293846;
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
color: white;
z-index: 10;
`