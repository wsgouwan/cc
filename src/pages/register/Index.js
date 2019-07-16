import React, { Component } from 'react';
import '../../assets/styles/common.scss';
import './style.scss';
import service from '../../assets/scripts/http';
import { getTimestamp, loadScript } from '../../assets/scripts/utils';
import JSEncrypt from 'JSEncrypt';
import base64url from 'base64url';
import {_Regex} from '../../assets/scripts/regex';
import qs from 'qs';
let captchaIns = null;
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0,   // 0 注册中，  1 注册成功   2 注册失败
      SMScount: 0,
      username: '',     // 手机号码
      password: '',     // 密码
      password2: '',    // 再次确认的密码
      client: 'web',
      captcha: '',      // 手机验证码
      verify: false,    // 验证通过的状态
      username_err: '', // 
      password_err: '',
      password2_err: '',
      captcha_err: ''
    };
    this.handlerSendSMS = this.handlerSendSMS.bind(this);
  }

  componentDidMount() {
    var url = 'http://cstaticdun.126.net/load.min.js' + '?t=' + getTimestamp(1 * 60 * 1000) // 时长1分钟，建议时长分钟级别
    loadScript(url, function () {
      initNECaptcha({
        captchaId: '3bdcda44e486465f88a0130561b1b54c',
        element: '#captcha',
        onReady: function (instance) {
          // 验证码一切准备就绪，此时可正常使用验证码的相关功能
        },
        onVerify: function (err, data) {
          /**
           * 第一个参数是err（Error的实例），验证失败才有err对象
           * 第二个参数是data对象，验证成功后的相关信息，data数据结构为key-value，如下：
           * {
           *   validate: 'xxxxx' // 二次验证信息
           * }
          **/
          if (err) return  // 当验证失败时，内部会自动refresh方法，无需手动再调用一次
          // 点击登录按钮后可调用服务端接口，以下为伪代码，仅作示例用

        }
      }, function onload(instance) {
        captchaIns = instance
      }, function onerror(err) {
        console.log(err)
        // 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
      })
    })
  }
  // 变更
  handleInputChange(e, type) {
    if (!type) return false;
    let value = e.target.value;
    if(['username', 'password', 'password2', 'captcha'].includes(type)) {
      this.setState({ [type]: value });
    }
  }

  // 清除错误
  handlerClearError(err){
    err && this.setState({[err]: ''})
  }

  handlerSendSMS() {
    let { SMScount, username } = this.state;
    if (SMScount > 0) return false;
    this.setState({ SMScount: 60 })
    this.handlerCaptchaCount(59);
    service.post('captcha/phone.do', { username: username });
  }

  // 验证码倒计时
  handlerCaptchaCount(time) {
    if (time < 0) return false;
    setTimeout(() => {
      this.setState({ SMScount: time });
      this.handlerCaptchaCount(time - 1)
    }, 1000)
  }

  // 验证通过后 点击注册的按钮
  handlerRegister() {
    let { verify, username, password, password2, captcha } = this.state;
    console.log(username, password, password2, captcha)
    if(username.length < 1) {
      this.setState({username_err: '请输入您的手机号码'})
      return false;
    }
    if(_Regex.username.test(username) == false) {
      this.setState({username_err: '请输入正确的手机号码'})
      return false;
    }

    for(let name of ['password', 'password2']){
      let _value = this.state[name];
      if(!_value){
        this.setState({[`${name}_err`]:'请输入密码'});
        break;
      }
      if(_Regex.password.test(_value) == false){
        this.setState({[`${name}_err`]: '密码格式错误（8-16位至少包含一个英文或特殊字符串密码）'});
        break;
      }
    }
    if(password !== password2) {
      this.setState({password2_err: '两次输入的密码不一致，请重新输入'});
      return false;
    }
    if(this.state.password_err || this.state.password2_err) return false;
    if(_Regex.captcha.test(captcha) == false) {
      this.setState({captcha_err: '验证码格式错误'})
      return false;
    }
    service.get('certificate/publickey.do').then((res) => {
      if (res.status == 200 && res.data.code == 200) {
        return res.data.data.content;
      }
    }).then((content) => {
      let encrypt = new JSEncrypt();
      encrypt.setPublicKey(content);
      let cipher = base64url.fromBase64(encrypt.encrypt(password));
      cipher = cipher + '===='.substr(0, 4 - cipher.length % 4)
      service.post('account/signup.do', { username, password: cipher, captcha, client: 'web' }).then((res) => {
        if (res.status == 200 && res.data.code == 200) {
          this.setState({ status: 1 });
          
        }
      })
    })
  }

  render() {
    let { SMScount, username_err, password_err, password2_err, captcha_err, status} = this.state;
    return (
      <div className="register">
        {/* 注册 */}
        {
          status == 0 ? (
            <div className="c1">
            <h1 className="title">手机账号注册</h1>
            <div className="form">
              <div className="form-group">
                <input type="tel" className="form-control" placeholder="手机号码" 
                  onFocus={()=>{this.handlerClearError('username_err')}}
                  onChange={(event) =>{this.handleInputChange(event, 'username')}}
                  name="username" />
                {username_err ?<span className="pp">{username_err}</span> : null}
              </div>
              <div className="form-group">
                <input type="password" className="form-control"
                onFocus={()=>{this.handlerClearError('password_err')}}
                onChange={(event) =>{this.handleInputChange(event, 'password')}}  
                placeholder="密码" name="password" />
                {password_err ?<span className="pp">{password_err}</span> : null}
              </div>
              <div className="form-group">
                <input type="password" className="form-control"
                onFocus={()=>{this.handlerClearError('password2_err')}}
                onChange={(event) =>{this.handleInputChange(event, 'password2')}}  
                placeholder="确认密码" name="password2" />
                {password2_err ?<span className="pp">{password2_err}</span> : null}
              </div>
              <div className="form-group">
                <div className="vcode">
                  <input type="text" className="form-control"
                  onFocus={()=>{this.handlerClearError('captcha_err')}}
                  onChange={(event) =>{this.handleInputChange(event, 'captcha')}}  
                  name="captcha"  
                  placeholder="验证码" />
                  {
                    SMScount > 0 ? (<div className="getVcode disabled">{`(${SMScount})S后刷新`}</div>) : (<div onClick={this.handlerSendSMS} className="getVcode">免费获取验证码</div>)
                  }
  
                </div>
                {captcha_err ?<span className="pp">{captcha_err}</span> : null}
              </div>
              <div id="captcha"></div>
              {/* 立即注册按钮 */}
              <div onClick={() => { this.handlerRegister() }} className="register-btn">立即注册</div>
            </div>
          </div>
          
          ) : <div className="c2"></div>

        }
        
      </div>
    )
  }
}