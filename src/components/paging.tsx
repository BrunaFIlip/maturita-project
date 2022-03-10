import { ClassNames } from "@emotion/react"
import { SDiv } from "../styles/paging"
import { useHistory} from "react-router-dom"

const Paging = ({page}: {page:number}) => {
const history = useHistory()

return (
<SDiv>
            <p className={page === 1 ? "active" : ""} onClick={() => {history.push("/cryptoList/page1")}}></p>
            <p className={page === 2 ? "active" : ""} onClick={() => {history.push("/cryptoList/page1")}}>2</p>
            <p className={page === 3 ? "active" : ""} onClick={() => {history.push("/cryptoList/page1")}}>3</p>
            <p className={page === 4 ? "active" : ""} onClick={() => {history.push("/cryptoList/page1")}}>4</p>
            <p className={page === 5 ? "active" : ""} onClick={() => {history.push("/cryptoList/page1")}}>5</p>
            <p className={page === 6 ? "active" : ""} onClick={() => {history.push("/cryptoList/page1")}}>6</p>
            <p className={page === 7 ? "active" : ""} onClick={() => {history.push("/cryptoList/page1")}}>7</p>
            <p className={page === 8 ? "active" : ""} onClick={() => {history.push("/cryptoList/page1")}}>8</p>
            <p className={page === 9 ? "active" : ""} onClick={() => {history.push("/cryptoList/page1")}}>9</p>
            <p className={page === 10 ? "active" : ""} onClick={() => {history.push("/cryptoList/page1")}}>10</p>
</SDiv>)
}

export default Paging