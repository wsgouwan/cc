import React, { Component } from "react";
import service from "../../assets/scripts/http";
import {_Regex} from '../../assets/scripts/regex';
import JSEncrypt from 'JSEncrypt';
import base64url from 'base64url';
import "../../assets/styles/common.scss";
import "./style.scss";
var cookie = require('licia/cookie')


export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      type: "password", // password  ||  vcode
      SMScount: 0,
      suspicious: 0,
      username: "",
      password: "",
      captcha: "",
      username_captcha_err: '',
      captcha_err:'',
      password_err: "",
      client: "web",
      errmsg: ''
    };
  }

  // 更换登陆模式
  changeType() {
    let { type } = this.state;
    type = type == "password" ? "vcode" : "password";
    this.setState({ type, password: "", vcode: "", username_captcha_err: "" });
    // document.querySelector('input[name="password"]').setAttribute('value', '');
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
  handlerValueChange(event, str){
    let value = event.target.value;
    this.setState({[str]: value});

  }
  // 点击登陆
  handlerLogin() {
    let {type} = this.state;
    if(type != 'password') {
      this.handlerSendCaptchaLogin();
    }else{
      this.handlerUsePasswordLogin();
    }
  }

  // 发送验证码的请求
  handlerSendCaptchaLogin(){
    let {username, captcha} = this.state;
    if(username.length < 1) {
      this.setState({username_captcha_err: '请输入您的手机号码'})
      return false;
    }
    if(_Regex.username.test(username) == false) {
      this.setState({username_captcha_err: '请输入正确的手机号码'})
      return false;
    }
    if(_Regex.captcha.test(captcha) == false) {
      this.setState({captcha_err: '验证码格式错误'})
      return false;
    }
    service.post('account/shortcut.do', { username, captcha, client: 'web' }).then((res) => {
      var data = res.data && res.data.data ;
      if(res.status == 200){
        console.log(res.headers['json-web-token'])
        cookie.set('json-web-token', res.headers['json-web-token'])
      }
      if (res.status == 200 && res.data.code == 200) {
        cookie.set('username', username);
        cookie.set('interim', data.interim);
        cookie.set('uuid', data.uuid);
        alert('登陆成功')
      }else{
        this.setState({errmsg: res.data.info, suspicious: data ? data.suspicious: 0})
      }
    })

  }
  // 使用密码登录
  handlerUsePasswordLogin(){
    let {username, password,captcha, suspicious} = this.state;
    if(username.length < 1) {
      this.setState({username_captcha_err: '请输入您的手机号码'})
      return false;
    }
    if(password.length < 1) {
      this.setState({password_err: '请输入密码'})
      return false;
    }
    if(_Regex.username.test(username) == false) {
      this.setState({username_captcha_err: '请输入正确的手机号码'})
      return false;
    }
    if(_Regex.password.test(password) == false) {
      this.setState({password_err: '密码格式错误（8-16位至少包含一个英文或特殊字符串密码）'})
      return false;
    }
    if(suspicious == 1){
      if(_Regex.captcha.test(captcha) == false) {
        this.setState({captcha_err: '验证码格式错误'})
        return false;
      }
    }
    service.get('certificate/publickey.do').then((res) => {
      if (res.status == 200 && res.data.code == 200) {
        return res.data.data.content;
      }
    }).then((content) => {
      console.log(content)
      let encrypt = new JSEncrypt();
      encrypt.setPublicKey(content);
      let cipher = base64url.fromBase64(encrypt.encrypt(password));
      cipher = cipher + '===='.substr(0, 4 - cipher.length % 4)
      service.post('account/signin.do', { username, password: cipher, client: 'web',captcha}).then((res) => {
        console.log(res)
        if (res.status == 200 && res.data.code == 200) {
          var data = res.data.data;
          setCookie('username', username);
          setCookie('interim', data.interim);
          setCookie('username', data.uuid);
        }else{
          this.setState({errmsg: res.data.info, suspicious: res.data.data.suspicious})
        }
      })
    })
  }

  render() {
    let { type, SMScount,username_captcha_err , captcha_err, password_err, errmsg, suspicious } = this.state;
    return (
      <div className="login-wrap">
        {type == "password" ? (
          <div className="c1">
            <h1 className="title">会员登录</h1>
            <div className="form">
              <div className="form-group">
                <input type="tel" className="form-control" placeholder="手机号码" name="username"
                  onChange={(event) =>{this.handlerValueChange(event, 'username')}}
                  onFocus={()=>{this.handlerClearError('username_captcha_err')}}/>
                {username_captcha_err ?<span className="pp">{username_captcha_err}</span> : null}
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder="密码" name="username"
                  onChange={(event) =>{this.handlerValueChange(event, 'password')}}
                  onFocus={()=>{this.handlerClearError('password_err')}}/>
                {password_err ?<span className="pp">{password_err}</span> : null}
              </div>
              {
                suspicious == 1 ? (
                <div className="form-group">
                  <div className="vcode">
                    <input type="text" className="form-control" placeholder="验证码" maxLength="6"
                      onChange={(event)=>{this.handlerValueChange(event, 'captcha')}}
                      onFocus={()=>{this.handlerClearError('captcha_err')}}
                    />
                    {SMScount > 0 ? (
                      <div className="getVcode disabled">{`(${SMScount})S后刷新`}</div>
                    ) : (
                      <div onClick={() => {this.handlerSendSMS();}}className="getVcode">免费获取验证码</div>
                    )}
                  </div>
                  {captcha_err ?<span className="pp">{captcha_err}</span> : null}
                </div>) :null
              }
            </div>
            <p className="errmsg">{errmsg? errmsg: ''}</p>
            <div className="register-btn" onClick={() => { this.handlerLogin();}}>登陆</div>
            <div className="change-type" onClick={() => {this.changeType();}}>使用验证码登陆</div>
          </div>
        ) : (
          <div className="c2">
            <h1 className="title">会员登录</h1>
            <div className="form">
              <div className="form-group">
                <input type="tel" className="form-control" placeholder="手机号码" name="username"
                  onChange={(event) =>{this.handlerValueChange(event, 'username')}}
                  onFocus={()=>{this.handlerClearError('username_captcha_err')}}
                />
                {username_captcha_err ?<span className="pp">{username_captcha_err}</span> : null}
              </div>
              <div className="form-group">
                <div className="vcode">
                  <input type="text" className="form-control" placeholder="验证码" maxLength="6"
                    onChange={(event)=>{this.handlerValueChange(event, 'captcha')}}
                    onFocus={()=>{this.handlerClearError('captcha_err')}}
                  />
                  {SMScount > 0 ? (
                    <div className="getVcode disabled">{`(${SMScount})S后刷新`}</div>
                  ) : (
                    <div onClick={() => {this.handlerSendSMS();}}className="getVcode">免费获取验证码</div>
                  )}
                </div>
                {captcha_err ?<span className="pp">{captcha_err}</span> : null}
              </div>
              <div id="captcha" />
            </div>
            <p className="errmsg">{errmsg? errmsg: ''}</p>
            <div className="register-btn" onClick={() => { this.handlerLogin(); }}>登陆</div>
            <div className="change-type" onClick={() => {this.changeType();}}>使用账号密码登录</div>
          </div>
        )}
      </div>
    );
  }
}
