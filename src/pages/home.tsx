import React from 'react';
import IPageProps from '../interfaces/page';
import Sidebar from '../components/Sidebar/Sidebar';
import BitCoinChart from '../components/Graphs/bitCoinChart';


const HomePage: React.FunctionComponent<IPageProps> = props => {
    return (<>
        <BitCoinChart/>
        </>
    );
}

export default HomePage;