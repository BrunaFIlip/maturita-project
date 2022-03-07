import { ClassNames } from "@emotion/react"
import { SDiv } from "../styles/paging"

const Paging = ({page}: {page:number}) => {
return (
<SDiv>
            <a className={page === 1 ? "active" : ""} href="/cryptoList/page1">1</a>
            <a className={page === 2 ? "active" : ""} href="/cryptoList/page2">2</a>
            <a className={page === 3 ? "active" : ""} href="/cryptoList/page3">3</a>
            <a className={page === 4 ? "active" : ""} href="/cryptoList/page4">4</a>
            <a className={page === 5 ? "active" : ""} href="/cryptoList/page5">5</a>
            <a className={page === 6 ? "active" : ""} href="/cryptoList/page6">6</a>
            <a className={page === 7 ? "active" : ""} href="/cryptoList/page7">7</a>
            <a className={page === 8 ? "active" : ""} href="/cryptoList/page8">8</a>
            <a className={page === 9 ? "active" : ""} href="/cryptoList/page9">9</a>
            <a className={page === 10 ? "active" : ""} href="/cryptoList/page10">10</a>
</SDiv>)
}

export default Paging