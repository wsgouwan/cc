/**
 * @description 校验的正则表达式
 */

 let _Regex = {};
 _Regex.username = /^(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
 _Regex.password = /^.*(?=.{8,16})(?=.*[A-Za-z0-9]{1,})(?=.*[!@#$%^&*?\.\(\)]).*$/;
 _Regex.captcha = /\d{6}/;

 export {
  _Regex
 };