import React, { Component } from 'react';
import '../../assets/styles/common.scss';
import './style.scss';
import service from '../../assets/scripts/http';
import { getTimestamp, loadScript } from '../../assets/scripts/utils';
import JSEncrypt from 'JSEncrypt';
import base64url from 'base64url';
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
        // 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
      })
    })
  }

  handleInputChange(e, type) {
    if (!type) return false;
    let value = e.target.value;
    if(['username', 'password', 'captcha'].includes(type)) {
      this.setState({ [type]: value });
    }
  }

  handlerSendSMS() {
    let { SMScount, username } = this.state;
    if (SMScount > 0) return false;
    this.setState({ SMScount: 60 })
    this.handlerCaptchaCount(59);
    service.post('captcha/phone.do', { username: "15281069734" });
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
    let { verify, username, password, captcha } = this.state;
    username = '15281069734';
    password = 'ws123456@';
    captcha = '266234';

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
          this.setState({ status: 1 })
        }
      })
    })
  }

  render() {
    let { SMScount } = this.state;
    return (
      <div className="register">
        {/* 注册 */}
        <div className="c1">
          <h1 className="title">手机账号注册</h1>
          <div className="form">
            <div className="form-group">
              <input type="tel" className="form-control" placeholder="手机号码" name="username" />
              <span className="pp">请输入您的手机号码</span>
            </div>
            <div className="form-group">
              <input type="password" className="form-control" placeholder="密码" />
              <span className="pp"></span>
            </div>
            <div className="form-group">
              <input type="password" className="form-control" placeholder="确认密码" />
              <span className="pp"></span>
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
            <div id="captcha"></div>
            {/* 立即注册按钮 */}
            <div onClick={() => { this.handlerRegister() }} className="register-btn">立即注册</div>
          </div>
        </div>
        {/* 注册成功 */}
        <div className="c2"></div>
      </div>
    )
  }
}