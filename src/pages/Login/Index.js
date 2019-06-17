import React, { Component } from "react";
import service from "../../assets/scripts/http";
import {_Regex} from '../../assets/scripts/regex'
import "../../assets/styles/common.scss";
import "./style.scss";

console.log(_Regex)

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      type: "password", // password  ||  vcode
      SMScount: 0,
      username: "",
      username_captcha_err: '',
      captcha_err:'',
      password: "",
      captcha: "",
      client: "web"
    };
  }

  // 更换登陆模式
  changeType() {
    let { type } = this.state;
    type = type == "password" ? "vcode" : "password";
    this.setState({ type, username: "", password: "", vcode: "" });
  }
  // 点击发送验证码
  handlerSendSMS() {
    let { SMScount, username } = this.state;
    if (SMScount > 0) return false;
    if(username.length < 1) {
      this.setState({username_captcha_err: '请输入您的手机号码'})
      return false;
    }
    if(_Regex.username.test(username) == false) {
      this.setState({username_captcha_err: '请输入正确的手机号码'})
      return false;
    }

    this.setState({ SMScount: 60 });
    this.handlerCaptchaCount(59);
    service.post("captcha/phone.do", { username });
  }
  // 验证码倒计时
  handlerCaptchaCount(time) {
    if (time < 0) return false;
    setTimeout(() => {
      this.setState({ SMScount: time });
      this.handlerCaptchaCount(time - 1);
    }, 1000);
  }
  // 清除错误
  handlerClearError(err){
    err && this.setState({[err]: ''})
  }
  // 变更
  handlerValueChange(e, str){
    console.log(e)
    let value = e.target.value;
    console.log(value)
  }
  // 点击登陆
  handlerLogin() {}

  render() {
    let { type, SMScount,username_captcha_err } = this.state;
    return (
      <div className="reset-wrap">
        {type == "password" ? (
          <div className="c1">
            <h1 className="title">会员登录</h1>
            <div className="form">
              <div className="form-group">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="手机号码"
                  name="username"
                />
                {username_captcha_err ?<span className="pp">{username_captcha_err}</span> : null}
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="密码"
                  name="username"
                />
                <span className="pp"></span>
              </div>
            </div>
            <div
              className="register-btn"
              onClick={() => {
                this.handlerLogin();
              }}
            >
              登陆
            </div>
            <div
              className="change-type"
              onClick={() => {
                this.changeType();
              }}
            >
              使用验证码登陆
            </div>
          </div>
        ) : (
          <div className="c2">
            <h1 className="title">会员登录</h1>
            <div className="form">
              <div className="form-group">
                <input type="tel" className="form-control" placeholder="手机号码" name="username"
                  onChange={(e) =>{this.handlerValueChange(e, 'username')}}
                  onFocus={()=>{this.handlerClearError('username_captcha_err')}}
                />
                {username_captcha_err ?<span className="pp">{username_captcha_err}</span> : null}
              </div>
              <div className="form-group">
                <div className="vcode">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="验证码"
                    onFocus={()=>{this.handlerClearError('captcha_err')}}
                  />
                  {SMScount > 0 ? (
                    <div className="getVcode disabled">{`(${SMScount})S后刷新`}</div>
                  ) : (
                    <div
                      onClick={() => {
                        this.handlerSendSMS();
                      }}
                      className="getVcode"
                    >
                      免费获取验证码
                    </div>
                  )}
                </div>
                <span className="pp"></span>
              </div>
              <div id="captcha" />
            </div>
            <div
              className="register-btn"
              onClick={() => {
                this.handlerLogin();
              }}
            >
              登陆
            </div>
            <div
              className="change-type"
              onClick={() => {
                this.changeType();
              }}
            >
              使用账号密码登录
            </div>
          </div>
        )}
      </div>
    );
  }
}
