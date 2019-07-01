import React, { Component } from 'react';
import './style.scss';

export default class Price extends Component {
  constructor(){
    super();
    this.state = {
      username: '',
      type: '',           // 选择要充值的
      prices: [
        {type:'monthly',duratopn: '0.54',totalPrice: '199'},
        {type:'season',duratopn: '0.54',totalPrice: '199'},
        {type:'yearly',duratopn: '0.54',totalPrice: '199'}
      ],
      pay_type: 'weixin',
      total: ''
    }
  }
  componentDidMount(){
    console.log(this.props.match.params)
  }

  render() {
    let {username} = this.state;
    return (
      <div className="pay_wrap">
        <div className=" line">
          <div className="left">充值账号</div>
          <div className="right">
            {username ? <span>username</span>: <a href="">请登录</a>}
          </div>
        </div>
        <div className="line">
          <div className="left">套餐选择</div>
          <div className="right">
            <ul>
              <li>
                <div className="type"></div>
                <div className="price"></div>
                <div className="totalPrice"></div>
              </li>
            </ul>
          </div>
        </div>
        <div className="line">
          <div className="left">支付方式</div>
          <div className="right">
            <div className="weixin"></div>
            <div className="zhifubao"></div>
          </div>
        </div>
        <div className="line">
          <div className="left">支付金额:</div>
          <div className="right">
            <p></p>
          </div>
        </div>
        <div className="line">
          <div className="left"></div>
          <div className="">
            <div className="button">立即充值</div>
          </div>
        </div>
      </div>
    )
  }
}