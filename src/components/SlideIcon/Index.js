import React, { Component } from 'react';
import './style.scss'

export default class Slide extends Component {
  constructor() {
    super();
    this.state = {
      show: true
    }
  }
  componentDidMount() {
    let _this = this;
    this.handlerSetShow();
    window.onresize = function () {
      _this.handlerSetShow();
    }
  }

  handlerSetShow(){
    let _w = document.body.clientWidth;
    if(_w < 1000) {
      this.setState({show: false})
    }
  }

  render() {
    let { show } = this.state;
    return (
      show ? (
        <div className="slideIcon">
          <div className="qq"></div>
          <div className="weibo">
            <img src=""/>
          </div>
          <div className="wechat">
            <img src=""/>
          </div>
        </div>
      ) : null
    )
  }
}