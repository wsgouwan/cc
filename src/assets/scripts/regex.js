/**
 * @description 校验的正则表达式
 */

 let Regex = {};
 Regex.username = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
 Regex.password = /^.*(?=.{8,16})(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,})(?=.*[!@#$%^&*?\(\)]).*$/;
 Regex.captcha = /\d{6}/;

 export default Regex;