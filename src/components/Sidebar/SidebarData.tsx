import React from 'react'
 import HomeIcon from '@mui/icons-material/Home';
 import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
 import ListAltIcon from '@mui/icons-material/ListAlt';
 import AccountCircleIcon from '@mui/icons-material/AccountCircle';
 import LogoutIcon from '@mui/icons-material/Logout';


export const SidebarData = [{
    title: "Portfolio",
    icon: <ListAltIcon />,
    Link: "/"
},
{
    title: "Přehled kryptoměn",
    icon: <MonetizationOnIcon />,
    Link: "/cryptoList"
},
{
    title: "Odhlásit se",
    icon: <LogoutIcon />,
    Link: "/logout"
}
]