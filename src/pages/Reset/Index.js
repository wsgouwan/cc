import React, { Component } from 'react';
import '../../assets/styles/common.scss';
import './style.scss';

export default class Reset extends Component {
  constructor(){
    super();
    this.state = {
      step: 0,      // 0 验证码阶段   1 重置密码阶段
      SMScount: 0
    }
  }

  // 点击下一步
  handlerNext(){
    this.setState({
      step: 1
    })
  }

  render() {
    let {step, SMScount} = this.state;
    return (
      <div className="reset-wrap">
        {
          step == 0 ? (<div className="c1">
            <h1 className="title">填写手机号码</h1>
            <div className="form">
              <div className="form-group">
                <input type="tel" className="form-control" placeholder="手机号码" name="username" />
                <span className="pp">请输入您的手机号码</span>
              </div>
              <div className="form-group">
                <div className="vcode">
                  <input type="text" className="form-control" placeholder="验证码" />
                  {
                    SMScount > 0 ? (<div className="getVcode disabled">{`(${SMScount})S后刷新`}</div>) : (<div onClick={this.handlerSendSMS} className="getVcode">免费获取验证码</div>)
                  }

                </div>
                <span className="pp">请输入您的手机号码</span>
              </div>
            </div>
            <div className="register-btn" onClick={()=>{this.handlerNext()}}>下一步</div>
          </div>) : (<div className="c2">
            <h1 className="title">设置新密码</h1>
              <div className="form">
                <div className="form-group">
                  <input type="tel" className="form-control" placeholder="新密码" name="username" />
                  <span className="pp">请输入您的密码</span>
                </div>
                <div className="form-group">
                  <input type="tel" className="form-control" placeholder="再次确认新密码" name="username" />
                  <span className="pp">请输入您的密码</span>
                </div>
              </div>
              <div className="register-btn" onClick={()=>{this.handlerNext()}}>登陆会员中心</div>
          </div>)
        }
      </div>
    )
  }
}