 import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
 import ListAltIcon from '@mui/icons-material/ListAlt';
 import LogoutIcon from '@mui/icons-material/Logout';
 import PasswordIcon from '@mui/icons-material/Password';


export const SidebarData = [{
    title: "Portfolio",
    icon: <ListAltIcon />,
    Link: "/portfolio"
},
{
    title: "Přehled kryptoměn",
    icon: <MonetizationOnIcon />,
    Link: "/cryptoList/page1"
},
{
    title: "Změnit heslo",
    icon: <PasswordIcon/>,
    Link: "/change"
},
{
    title: "Odhlásit se",
    icon: <LogoutIcon />,
    Link: "/logout"
}
]