import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import service from "../../assets/scripts/http";
import cs from 'classnames'
import './style.scss';
import Modal from '../../components/Modal/Index'
var cookie = require('licia/cookie')

export default class Price extends Component {
  constructor(){
    super();
    let username = cookie.get('username');
    this.state = {
      username: username,
      type: '',           // 选择要充值的
      prices: [
        {type:'monthly',duratopn: '1.20',totalPrice: '36.00',title:'包月'},
        {type:'season',duratopn: '0.99',totalPrice: '89.00', title:'包季'},
        {type:'yearly',duratopn: '0.79',totalPrice: '289.00',title:'包年'}
      ],
      pay_type: 'weixin',
      total: '',
      url: '',
      showWxPay: false,      //展示微信支付
    }
    this.handlerClose = this.handlerClose.bind(this);
  }

  handlerChangeType(orderType){
    console.log(orderType);
    let {type} = this.state;
    if(orderType == type) return false;
    this.setState({type: orderType});
  }

  handlerChangePay(type){
    this.setState({pay_type: type})
  }

  // 立即支付
  handlerPay(){
    let {type} = this.state;
    let jwt = cookie.get('json-web-token');
    service.defaults.headers.common['Json-Web-Token'] = jwt;
    service.post(`https://defray.vaiee.com/wechat/unified.do?goods=${type}`).then(res =>{
      if(res.status == 200 &&res.data.code == 200){
        this.setState({url: res.data.data.qr_url, showWxPay: true})
      }
    }, error =>{
      console.log(error);
      window.location.href ='/'
    })
  }

  handlerClose(){
    this.setState({ showWxPay: false})
  }

  componentDidMount(){
    let type = this.props.match.params.type;
    if(['monthly', 'season', 'yearly'].includes(type)) {
      this.setState({type});
    }else {
      console.log('跳转')
    }
  }

  render() {
    let {username, prices, type, pay_type, url, showWxPay} = this.state;
    let pay_count = 0;
    pay_count = prices.filter(item =>{
      return  item.type == type;
    })
    pay_count = pay_count.length > 0 ? pay_count[0]['totalPrice'] : 0

    return (
      <div className="pay_wrap">
        <div className=" line">
          <div className="left">充值账号</div>
          <div className="right">
            {username ? <span className="username">{username}</span>: <a className="login" href="/#/login">请登录</a>}
          </div>
        </div>
        <div className="line">
          <div className="left">套餐选择</div>
          <div className="right">
            <ul>
              {
                prices.map((item,index) =>{
                  return(
                    <li key={item.type} className={cs({active: type == item.type})} onClick={()=>{this.handlerChangeType(item.type)}}>
                      <div className="type">{item.title}</div>
                      <div className="price"><span className="big">{item.duratopn}</span>元/天</div>
                      <div className="totalPrice">总价{item.totalPrice}元</div>
                  </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        <div className="line">
          <div className="left">支付方式</div>
          <div className="right">
            <div className={cs({'pay-type': true, 'weixin': true,active: pay_type == 'weixin'})} onClick={()=>{this.handlerChangePay('weixin')}}></div>
            <div className={cs({'pay-type': true, 'zhifubao': true,active: pay_type == 'zhifubao'})} onClick={()=>{this.handlerChangePay('zhifubao')}}></div>
          </div>
        </div>
        <div className="line">
          <div className="left">支付金额:</div>
          <div className="right">
            <p className="pay-count"><span className="big">{pay_count}</span>元</p>
          </div>
        </div>
        <div className="line">
          <div className="left"></div>
          <div className="right">
            <div className="button" onClick={()=>{this.handlerPay()}}>立即充值</div>
          </div>
        </div>
        <Modal show={showWxPay} handlerClose={this.handlerClose}>
          <div className="pay-content">
            <div className="close"></div>
            <p>微信扫一扫付款（元）</p>
            <p className="order-price">{pay_count}</p>
            <div className="qrCode">
              <QRCode value={url} size={120} />
              <p>打开微信扫一扫</p>
            </div>
            <p></p>
          </div>
        </Modal>
      </div>
    )
  }
}