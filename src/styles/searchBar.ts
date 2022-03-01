import styled from "styled-components";

export const SDataResult = styled.div`
margin-top: 5px;
width: 300px;
height: 200px;
background-color: white;
box-shadow: rgba(0,0,0,0.35) 0px 5px 15px;
overflow: hidden;
overflow-y: auto;

::-webkit-scrollbar {
    display: none;
}
`


export const SDataItem = styled.div`
width: 100%;
height: 50px;
display: flex;
align-items: center;
color: black;

:hover {
background: lightgray;
}
p {
    margin-left: 10px;
}
`