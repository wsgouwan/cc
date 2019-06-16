import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export default class Nav extends Component {

  render() {
    
    return (
      <div className="headder">
        <div className="w1000">
          <div className="logo">
            V速网游加速器
          </div>
          <div className="right">
            <ul>
              <li><Link to="/">首页</Link></li>
              <li><Link to="/price">套餐</Link></li>
              <li><Link to="/download">下载</Link></li>
              <li><Link to="/userinfo">帮助 </Link></li>
            </ul>
            <div className="buttons">
              <Link to="/">登录</Link>
              <Link className="register" to="/">免费注册</Link>
            </div>
          </div>

        </div>
      </div>
    )
  }
}