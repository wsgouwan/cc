import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export default class Nav extends Component {

  render() {
    let hash = window.location.hash;
    let route = hash.substr(2);
    let routes = ['register', 'price', 'download', 'help'];
    let reg = /[\/|\?\#]/;
    let showNav = true;
    if(reg.test(route)) {
      let _match = route.match(reg)[0];
      route = route.split(_match)[0];
    }
    if(routes.includes(route) || route == '') {
      showNav = true
    }else{
      showNav = false;
    }

    return (
      <div className="headder">
        <div className="w1000">
          <div className="logo">
            V速网游加速器
          </div>
          <div className="right">
            <ul>
              <li className={route == '' ? 'active': ''}><Link to="/">首页</Link></li>
              <li className={route == 'price' ? 'active': ''}><Link to="/price">套餐</Link></li>
              <li className={route == 'download' ? 'active': ''}><Link to="/download">下载</Link></li>
              <li className={route == 'help' ? 'active': ''}><Link to="/help">帮助 </Link></li>
            </ul>
            <div className="buttons">
              <Link className="login" to="/login">登录</Link>
              <Link className="register" to="/register">免费注册</Link>
            </div>
          </div>

        </div>
      </div>
    )
  }
}