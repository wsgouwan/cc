import React, { Component } from "react";
let icon_speed = require("../../assets/images/icon_speed.png");
let icon_node = require("../../assets/images/icon_node.png");
let icon_setting = require("../../assets/images/icon_setting.png");
let img_home = require("../../assets/images/img_home.png");
import "./style.scss";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home-wrap">
        <div className="banner">
          <div className="w1000">
            <div className="text">
              <p className="title1">
                专线保证，超快加速，超低
                <br />
                延迟，给您极致的
              </p>
              <p>最智能的网游加速器</p>
              <a href="">立即下载体验</a>
            </div>
            <div className="img">
                <img src={img_home}/>
                <div className="icon icon1"></div>
                <div className="icon icon2"></div>
                <div className="icon icon3"></div>
            </div>
          </div>
        </div>
        <div className="description">
          <p className="title1">V速网游加速器，全新智能节点分配方案</p>
          <ul className="w1000">
            <li>
              <img src={icon_speed} />
              <p className="title">极致的游戏体验</p>
              <p>
                自主研发全新到节点分配系统，确保游戏数据传输的高效性，给您超低到游戏延迟体验
              </p>
            </li>
            <li>
              <img src={icon_node} />
              <p className="title">专业的技术团队</p>
              <p>
              	7*24小时技术保障服务，为广大游戏玩家保驾护航
              </p>
            </li>
            <li>
              <img src={icon_setting} />
              <p className="title">追求品质，稳中求进</p>
              <p>
                清新小巧的外观设计，流畅智能的加速体验，减少用户麻烦，让加速回归简单自然
              </p>
            </li>
          </ul>
        </div>
        <div className="gamelist" />
      </div>
    );
  }
}
