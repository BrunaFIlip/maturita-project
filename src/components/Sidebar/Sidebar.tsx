import React from 'react'
import {
    SSideBar,
    SUl,
    STitle,
    // SIcon
} from '../../styles/sidebar'
import {SidebarData} from './SidebarData'

export const Sidebar = () => {
    return (
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
                <STitle>{val.title}</STitle>{" "}
                </li>
            )
        })}
        </SUl>
        </SSideBar>
    )
}
