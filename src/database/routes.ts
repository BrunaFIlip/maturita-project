import ChangePasswordPage from "../pages/auth/change";
import ForgotPasswordPage from "../pages/auth/forgot";
import LoginPage from "../pages/auth/login";
import LogoutPage from "../pages/auth/logout";
import RegisterPage from "../pages/auth/register";
import ResetPasswordPage from "../pages/auth/reset";
import ListOfCrypto from '../pages/cryptoList'
import Main from '../pages/portfolio/main'
import NewCrpyto from "../pages/portfolio/newCrypto";
import Chart from "../components/Graphs/cryptoChart";
import SellCrypto from "../pages/portfolio/sellCrypto";
import Favourite from "../pages/portfolio/favourite"

interface IRoute {
    path: string;
    exact: boolean;
    component: any;
    name: string;
    protected: boolean;
}


const routes: IRoute[] = [
    {
        path: '/register',
        exact: true,
        component: RegisterPage,
        name: 'Register Page',
        protected: false
    },
    {
        path: '/login',
        exact: true,
        component: LoginPage,
        name: 'Login Page',
        protected: false
    },
    {
        path: '/change',
        exact: true,
        component: ChangePasswordPage,
        name: 'Change Password Page',
        protected: true
    },
    {
        path: '/logout',
        exact: true,
        component: LogoutPage,
        name: 'Logout Page',
        protected: true
    },
    {
        path: '/forget',
        exact: true,
        component: ForgotPasswordPage,
        name: 'Forgot Password Page',
        protected: false
    },
    {
        path: '/reset',
        exact: true,
        component: ResetPasswordPage,
        name: 'Reset Password Page',
        protected: false
    },
    {
        path: '/cryptoList',
        exact: true,
        component: ListOfCrypto,
        name: 'Crypto List Pagess',
        protected: true
    },
    {
        path: '/',
        exact: true,
        component: Main,
        name: 'Portfolio Main Page',
        protected: true
    },
    {
        path: '/newCrypto',
        exact: true,
        component: NewCrpyto,
        name: 'Přidat crypto',
        protected: true
    },
    {
        path: '/nasrat/:id',
        exact: true,
        component: Chart,
        name: 'nasrat',
        protected: true
    },
    {
        path: '/sellCrypto',
        exact: true,
        component: SellCrypto,
        name: 'Prodat crypto',
        protected: true
    },
    {
        path: '/favourite',
        exact: true,
        component: Favourite,
        name: 'Oblíbené crypto',
        protected: true
    }
];

export default routes;
