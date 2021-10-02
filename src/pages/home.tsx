import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Container } from 'reactstrap';
import IPageProps from '../interfaces/page';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Header } from '../components/Header';

const HomePage: React.FunctionComponent<IPageProps> = props => {
    return (<>
        <Header/>
        <Sidebar/>
        </>
    );
}

export default HomePage;