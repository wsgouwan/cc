import React, {Component} from 'react';

import Nav from 'components/Nav/Nav';
import Footer from 'components/Footer/Index';
import getRouter from 'router/router';
import '../../assets/styles/common.scss'

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