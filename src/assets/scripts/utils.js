function getTimestamp (msec) {
  msec = !msec && msec !== 0 ? msec : 1
  return parseInt((new Date()).valueOf() / msec, 10)
}

function loadScript (src, cb) {
  var head = document.head || document.getElementsByTagName('head')[0]
  var script = document.createElement('script')

  cb = cb || function () {}

  script.type = 'text/javascript'
  script.src = src

  if (!('onload' in script)) {
    script.onreadystatechange = function () {
      if (this.readyState !== 'complete' && this.readyState !== 'loaded') return
      this.onreadystatechange = null
      cb(script)
    }
  }

  script.onload = function () {
    this.onload = null
    cb(script)
  }

  head.appendChild(script)
}

function isNum (val){
  return objToStr(val) === '[object Number]';
}

function isUndef(val){
  return val === void 0;
}

function setCookie(key, val, options) {
  if (!isUndef(val)) {
      options = options || {};
      options = defaults(options, defOpts);

      if (isNum(options.expires)) {
          var expires = new Date();
          expires.setMilliseconds(
              expires.getMilliseconds() + options.expires * 864e5
          );
          options.expires = expires;
      }

      val = encodeURIComponent(val);
      key = encodeURIComponent(key);

      document.cookie = [
          key,
          '=',
          val,
          options.expires && '; expires=' + options.expires.toUTCString(),
          options.path && '; path=' + options.path,
          options.domain && '; domain=' + options.domain,
          options.secure ? '; secure' : ''
      ].join('');
      
      return exports;
  }

  var cookies = document.cookie ? document.cookie.split('; ') : [],
      result = key ? undefined : {};

  for (var i = 0, len = cookies.length; i < len; i++) {
      var c = cookies[i],
          parts = c.split('='),
          name = decodeUriComponent(parts.shift());

      c = parts.join('=');
      c = decodeUriComponent(c);

      if (key === name) {
          result = c;
          break;
      }

      if (!key) result[name] = c;
  }

  return result;
}

function getCookie(key) {
  return setCookie(key);
}

function removeCookie(key, options){
  options = options || {};
    options.expires = -1;
    return setCookie(key, '', options);
}

export {
  getTimestamp,
  loadScript,
  setCookie,
  removeCookie,
  getCookie
}