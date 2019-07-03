import React, { Component } from 'react';
import './style.scss';

export default class Price extends Component {

  render() {
    return (
      <div className="price-wrap">
        <h1>特惠充值</h1>
        <div className="items">
          {/* 套餐1 */}
          <div className="item item1">
            <p className="name">包月套餐</p>
            <p className="price">
              <span className="small">￥</span>
              <span>29</span>
            </p>
            <div className="tab">原价36元</div>
            <p className="desc">有效期30天<br />折合0.97元/天</p>
            <a href="/#/pay/monthly" className="pay">立即充值</a>
          </div>
          {/* 套餐2 */}
          <div className="item item1">
            <p className="name">包季套餐</p>
            <p className="price">
              <span className="small">￥</span>
              <span>79</span>
            </p>
            <div className="tab">原价108元</div>
            <p className="desc">有效期90天<br />折合0.88元/天</p>
            <a href="/#/pay/season" className="pay">立即充值</a>
          </div>
          {/* 套餐4 */}
          <div className="item item1">
            <p className="name">包年套餐</p>
            <p className="price">
              <span className="small">￥</span>
              <span>269</span>
            </p>
            <div className="tab">原价288元</div>
            <p className="desc">有效期365天<br />折合0.74元/天</p>
            <a href="/#/pay/yearly" className="pay">立即充值</a>
          </div>
        </div>
      </div>
    )
  }
}