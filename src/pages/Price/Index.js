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
              <span>30</span>
            </p>
            <div className="tab">原价36元</div>
            <p className="desc">有效期30天<br />折合1.00元/天</p>
            <div className="pay">立即充值</div>
          </div>
          {/* 套餐2 */}
          <div className="item item1">
            <p className="name">包季套餐</p>
            <p className="price">
              <span className="small">￥</span>
              <span>69</span>
            </p>
            <div className="tab">原价108元</div>
            <p className="desc">有效期90天<br />折合0.77元/天</p>
            <div className="pay">立即充值</div>
          </div>
          {/* 套餐3 */}
          <div className="item item1">
            <p className="name">半年套餐</p>
            <p className="price">
              <span className="small">￥</span>
              <span>109</span>
            </p>
            <div className="tab">原价216元</div>
            <p className="desc">有效期180天<br />折合0.66元/天</p>
            <div className="pay">立即充值</div>
          </div>
          {/* 套餐4 */}
          <div className="item item1">
            <p className="name">包年套餐</p>
            <p className="price">
              <span className="small">￥</span>
              <span>199</span>
            </p>
            <div className="tab">原价288元</div>
            <p className="desc">有效期365天<br />折合0.54元/天</p>
            <div className="pay">立即充值</div>
          </div>
        </div>
      </div>
    )
  }
}