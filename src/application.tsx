import React, { useEffect, useState } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import ReactLoading from "react-loading"
import AuthRoute from './components/AuthRoute';
import {auth} from './database/firebase';
import logging from './database/logging';
import routes from './database/routes';
import {Font, Background} from '../src/styles/padding'
import {SMiddle} from "./styles/myCrypto"

export interface IApplicationProps { }

const Application: React.FunctionComponent<IApplicationProps> = props => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        auth.onAuthStateChanged((user:any) => {
            if (user)
            {
                logging.info('User detected.');
            }
            else
            {
                logging.info('No user detected');
            }

            setLoading(false);
        })
    }, []);

    if (loading)
        return <SMiddle><ReactLoading type="bars" color="black"/></SMiddle>

    return (
        <div>
            <Switch>
                {routes.map((route, index) => 
                    <Route
                        key={index}
                        path={route.path} 
                        exact={route.exact} 
                        render={(routeProps: RouteComponentProps<any>) => {
                            if (route.protected)
                                return <Font><Background /><AuthRoute><route.component  {...routeProps} /></AuthRoute></Font>;

                            return <Font><route.component  {...routeProps} /></Font>;
                        }}
                    />)}
            </Switch>
        </div>
    );
}

export default Application;