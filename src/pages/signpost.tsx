import { useHistory, Link } from "react-router-dom";
import { 
    SH1,
    BlackDiv,
    SP,
    GrayDiv,
    SButton,
    SButtonRed
} from "../styles/singpost";

const Signpost = () => {
    const history = useHistory();
return (<><BlackDiv>
    <SH1>BCoin</SH1>
    <SP>BCoin je přehledná a jednoduchá aplikace pro lidi, kteří chtějí mít přhled o svém crypto portfoliu.</SP>
    </BlackDiv>
    <GrayDiv>
        <SButton
                color="success"
                onClick={() => {window.location.href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"}}
                >Zadání projektu</SButton>
                        <SButton
                color="success"
                onClick={() => {window.location.href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"}}
                >Repozitář projektu</SButton>
                        <SButton
                color="success"
                onClick={() => {window.location.href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"}}
                >Dokumentace (.tex)</SButton>
                        <SButton
                color="success"
                onClick={() => {window.location.href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"}}
                >Dokumentace (.pdf)</SButton>
                        <SButtonRed
                color="warning"
                onClick={() => {history.push("/portfolio")}}
                >Aplikace</SButtonRed>
        </GrayDiv>
    </>)
}

export default Signpost;