import { SDiv } from "../styles/paging"
import { Link} from "react-router-dom"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Paging = ({page}: {page:number}) => {
    if(page > 5){
        return(
            <SDiv>
                {
                    page > 1 ? <p><Link to={"/cryptoList/page"+(page-1)}><ArrowBackIosIcon/></Link></p> : <></>
                }
            <p><Link to={"/cryptoList/page"+(page-4)}>{page - 4}</Link></p>
            <p><Link to={"/cryptoList/page"+(page-3)}>{page - 3}</Link></p>
            <p><Link to={"/cryptoList/page"+(page-2)}>{page - 2}</Link></p>
            <p><Link to={"/cryptoList/page"+(page-1)}>{page - 1}</Link></p>
            <p className= "active"><Link to={"/cryptoList/page"+page}>{page}</Link></p>
            <p><Link to={"/cryptoList/page"+(page+1)}>{page + 1}</Link></p>
            <p><Link to={"/cryptoList/page"+(page+2)}>{page + 2}</Link></p>
            <p><Link to={"/cryptoList/page"+(page+3)}>{page + 3}</Link></p>
            <p><Link to={"/cryptoList/page"+(page+4)}>{page + 4}</Link></p>
            <p><Link to={"/cryptoList/page"+(page+5)}>{page + 5}</Link></p>
            <p><Link to={"/cryptoList/page"+(page+1)}><ArrowForwardIosIcon/></Link></p>
</SDiv>
        )
    }else{
return (
<SDiv>
    {
        page > 1 ? <p><Link to={"/cryptoList/page"+(page-1)}><ArrowBackIosIcon/></Link></p> : <></>
    }
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
            <p><Link to={"/cryptoList/page"+(page+6)}><ArrowForwardIosIcon/></Link></p>
</SDiv>)
    }
}

export default Paging