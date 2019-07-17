import React, { Component } from "react";
import "./style.scss";

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="w1000">
          <ul>
            <li>
              <a>关于V速</a>
            </li>
            <li>
              <a>商务合作</a>
            </li>
            <li>
              <a>帮助中心</a>
            </li>
            <li>
              <a>官方QQ群</a>
              <div className="qq"></div>
            </li>
          </ul>
          <div className="cryp">
            <a href="http://beian.miit.gov.cn/">蜀ICP备19015164号</a>©2019
            autocryp All Right Reserved
          </div>
          <p className="cryp">成都奋楫科技有限公司</p>
        </div>
      </div>
    );
  }
}
