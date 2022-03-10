import { SDiv } from "../styles/paging"
import { Link} from "react-router-dom"

const Paging = ({page}: {page:number}) => {
return (
<SDiv>
            <p className={page === 1 ? "active" : ""}><Link to="/cryptoList/page1">1</Link></p>
            <p className={page === 2 ? "active" : ""}><Link to="/cryptoList/page2">2</Link></p>
            <p className={page === 3 ? "active" : ""}><Link to="/cryptoList/page3">3</Link></p>
            <p className={page === 4 ? "active" : ""}><Link to="/cryptoList/page4">4</Link></p>
            <p className={page === 5 ? "active" : ""}><Link to="/cryptoList/page5">5</Link></p>
            <p className={page === 6 ? "active" : ""}><Link to="/cryptoList/page6">6</Link></p>
            <p className={page === 7 ? "active" : ""}><Link to="/cryptoList/page7">7</Link></p>
            <p className={page === 8 ? "active" : ""}><Link to="/cryptoList/page8">8</Link></p>
            <p className={page === 9 ? "active" : ""}><Link to="/cryptoList/page9">9</Link></p>
            <p className={page === 10 ? "active" : ""}><Link to="/cryptoList/page10">10</Link></p>
</SDiv>)
}

export default Paging