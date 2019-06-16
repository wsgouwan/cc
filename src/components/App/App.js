import React, {Component} from 'react';

import Nav from 'components/Nav/Nav';
import Footer from 'components/Footer/Index';
import getRouter from 'router/router';

export default class App extends Component {
    render() {
        return (
            <div>
                <Nav/>
                {getRouter()}
                <Footer/>
            </div>
        )
    }
}