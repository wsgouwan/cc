import React, { Component } from 'react';
import '../../assets/styles/common.scss';
import './style.scss';

export default class Login extends Component {
  constructor(){
    super();
    this.state = {
      type: 'password',      // password  ||  vcode
      SMScount: 0,
      username: '',
      password: '',
      vcode: ''
    }
  }

  // 更换登陆模式
  changeType(){
    let {type} = this.state;
    type = type == 'password' ? 'vcode' : 'password';
    this.setState({type, username: '', password: '', vcode: ''});
  }
  // 点击登陆
  handlerLogin(){
    
  }

  render() {
    let {type, SMScount} = this.state;
    return (
      <div className="reset-wrap">
        {
          type == "password" ? (<div className="c1">
            <h1 className="title">会员登录</h1>
            <div className="form">
              <div className="form-group">
                <input type="tel" className="form-control" placeholder="手机号码" name="username" />
                <span className="pp">请输入您的手机号码</span>
              </div>
              <div className="form-group">
                <input type="tel" className="form-control" placeholder="密码" name="username" />
                <span className="pp">请输入您的手机号码</span>
              </div>
            </div>
            <div className="register-btn" onClick={()=>{this.handlerLogin()}}>登陆</div>
            <div className="" onClick={()=>{this.changeType()}}>使用验证码登陆</div>
          </div>) : (<div className="c2">
            <h1 className="title">会员登录</h1>
            <div className="form">
              <div className="form-group">
                <input type="tel" className="form-control" placeholder="手机号码" name="username" />
                <span className="pp">请输入您的手机号码</span>
              </div>
              <div className="form-group">
                <input type="tel" className="form-control" placeholder="密码" name="username" />
                <span className="pp">请输入您的手机号码</span>
              </div>
            </div>
            <div className="register-btn" onClick={()=>{this.handlerLogin()}}>登陆</div>
            <div className="" onClick={()=>{this.changeType()}}>使用验证码登陆</div>
          </div>)
        }
      </div>
    )
  }
}