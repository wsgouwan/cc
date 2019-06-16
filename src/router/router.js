import React from 'react';

import {Route, Switch} from 'react-router-dom';

import Bundle from './Bundle';
import Loading from 'components/Loading/Loading';

import Home from 'bundle-loader?lazy&name=home!pages/Home/Index';
import Register from 'bundle-loader?lazy&name=home!pages/Register/Index';
import Price from 'bundle-loader?lazy&name=home!pages/Price/Index';
import Download from 'bundle-loader?lazy&name=home!pages/Download/Index';

import NotFound from 'bundle-loader?lazy&name=home!pages/NotFound/Index';

const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props} /> : <Loading/>
        }
    </Bundle>
);

export default () => (
    <div>
        <Switch>
            <Route exact path="/" component={createComponent(Home)}/>
            <Route path="/register" component={createComponent(Register)}/>
            <Route path="/price" component={createComponent(Price)}/>
            <Route path="/download" component={createComponent(Download)}/>
            {/* <Route path="/page1" component={createComponent(Page1)}/>
            <Route path="/counter" component={createComponent(Counter)}/>
            <Route path="/userinfo" component={createComponent(UserInfo)}/> */}
            <Route component={createComponent(NotFound)}/>
        </Switch>
    </div>
);
