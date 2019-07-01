import React, { Component } from 'react';
import cs from 'classnames'
import './style.scss';

export default class Price extends Component {
  constructor(){
    super();
    this.state = {
      username: '15281069734',
      type: '',           // 选择要充值的
      prices: [
        {type:'monthly',duratopn: '1.20',totalPrice: '36.00',title:'包月'},
        {type:'season',duratopn: '0.99',totalPrice: '89.00', title:'包季'},
        {type:'yearly',duratopn: '0.79',totalPrice: '289.00',title:'包年'}
      ],
      pay_type: 'weixin',
      total: ''
    }
  }

  handlerChangeType(orderType){
    console.log(orderType);
    let {type} = this.state;
    if(orderType == type) return false;
    this.setState({type: orderType});
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
    let {username, prices, type} = this.state;
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
            {username ? <span className="username">{username}</span>: <a className="login" href="">请登录</a>}
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
            <div className="pay-type weixin">

            </div>
            <div className="pay-type zhifubao"></div>
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
            <div className="button">立即充值</div>
          </div>
        </div>
      </div>
    )
  }
}