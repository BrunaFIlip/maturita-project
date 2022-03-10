import { useLayoutEffect, useState} from 'react'
import {
    SSideBar,
    SUl,
    STitle,
    SIcon,
    SHamburger
} from '../../styles/sidebar'
import {SidebarData} from './SidebarData'
import { Header } from '../Header'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}


const Sidebar = () => {
    const [width] = useWindowSize();
    const [show, setShow]=useState(false)


    if(width > 1300){
    return (
        <>
        <Header/>
        <SSideBar>
        <SUl>
            {SidebarData.map((val, key) => {
            return(
                <Link
                key={key} 
                className="row"
                to={val.Link}
                > 
                {" "} 
                <SIcon>{val.icon}</SIcon>
                <STitle>{val.title}</STitle>{" "}
                </Link>
            )
        })}
        </SUl>
        </SSideBar>
        </>
    )
    }else{
        return (
            <>
            <SHamburger onClick={() => setShow(!show)}>
            <MenuIcon />
            </SHamburger>
            <Header/>
            {
                show?
            <SSideBar>
            <SUl>
                {SidebarData.map((val, key) => {
                return(
                    <Link 
                    key={key} 
                     className="row"
                     to={val.Link}
                    > 
                    {" "} 
                    <SIcon>{val.icon}</SIcon>
                    <STitle>{val.title}</STitle>{" "}
                    </Link>
                )
            })}
            </SUl>
            </SSideBar>
            : <></>}
            </>
        )
    }
}

export default Sidebar;