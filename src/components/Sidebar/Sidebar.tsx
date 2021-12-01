import {
    SSideBar,
    SUl,
    STitle,
    SIcon
} from '../../styles/sidebar'
import {SidebarData} from './SidebarData'
import { Header } from '../Header'

const Sidebar = () => {
    return (
        <>
        <Header/>
        <SSideBar>
        <SUl>
            {SidebarData.map((val, key) => {
            return(
                <li 
                key={key} 
                className="row"
                onClick={() => {
                    window.location.pathname = val.Link
                    }}
                > 
                {" "} 
                <SIcon>{val.icon}</SIcon>
                <STitle>{val.title}</STitle>{" "}
                </li>
            )
        })}
        </SUl>
        </SSideBar>
        </>
    )
}

export default Sidebar;