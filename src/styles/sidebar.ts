import styled from 'styled-components'

export const SSideBar = styled.div`
height: 100vh;
width: 250px;
background-color: #2f4050;
`

export const SUl = styled.ul`
height: auto;
padding: 0;
width: 100%;

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
// export const SIcon = styled.div`
// flex: 30%;
// display: grid;
// place-items: center;
// `

export const STitle = styled.div`
flex: 50%;
`
// export const SLi = styled.li`

// `