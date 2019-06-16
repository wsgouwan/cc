import React, { Component } from 'react';
import './style.scss'

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="w1000">
          <ul>
            <li><a>关于V速</a></li>
            <li><a>商务合作</a></li>
            <li><a>帮助中心</a></li>
            <li><a>官方QQ群</a></li>
          </ul>
          <div className="cryp">
            <a href=""></a>©2019 autocryp All Right Reserved
          </div>
        </div>
      </div>
    )
  }
}