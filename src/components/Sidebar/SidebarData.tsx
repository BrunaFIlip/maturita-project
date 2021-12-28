 import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
 import ListAltIcon from '@mui/icons-material/ListAlt';
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