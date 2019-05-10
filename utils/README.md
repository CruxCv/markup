# 一些常用的工具函数
*参考[outils](https://github.com/proYang/outils)

## url参数转对象
```javascript
/**
 * 
 * @desc   url参数转对象
 * @param  {String} url  default: window.location.href
 * @return {Object} 
 */
function parseQueryString(url) {
    url = url == null ? window.location.href : url
    var search = url.substring(url.lastIndexOf('?') + 1)
    if (!search) {
        return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}
```
## 判断是否为URL地址
```javascript
/**
 * 
 * @desc   判断是否为URL地址
 * @param  {String} str 
 * @return {Boolean}
 */
function isUrl(str) {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
}
```
## 判断是否为手机号
```javascript
/**
 * 
 * @desc   判断是否为手机号
 * @param  {String|Number} str 
 * @return {Boolean} 
 */
function isPhoneNum(str) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
}
```
## 获取操作系统类型
```javascript
/**
 * 
 * @desc 获取操作系统类型
 * @return {String} 
 */
function getOS() {
    var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
    var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
    var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

    if (/mac/i.test(appVersion)) return 'MacOSX'
    if (/win/i.test(appVersion)) return 'windows'
    if (/linux/i.test(appVersion)) return 'linux'
    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios'
    if (/android/i.test(userAgent)) return 'android'
    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
}
```
## 判断`obj`是否为空
```javascript
/**
 * 
 * @desc   判断`obj`是否为空
 * @param  {Object} obj
 * @return {Boolean}
 */
function isEmptyObject(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj))
        return false
    return !Object.keys(obj).length
}
```
## 生成指定范围随机数
```javascript
/**
 * 
 * @desc 生成指定范围随机数
 * @param  {Number} min 
 * @param  {Number} max 
 * @return {Number} 
 */
function randomNum(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}

function randomNum(min, ,max) {
    return ~~(Math.random() * (max - min + 1)) + min
}
```
## 获取浏览器类型和版本
```javascript
/**
 * 
 * @desc 获取浏览器类型和版本
 * @return {String} 
 */
function getExplore() {
    var sys = {},
        ua = navigator.userAgent.toLowerCase(),
        s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
        (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
        (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
        (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
        (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
        (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
        (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
    // 根据关系进行判断
    if (sys.ie) return ('IE: ' + sys.ie)
    if (sys.edge) return ('EDGE: ' + sys.edge)
    if (sys.firefox) return ('Firefox: ' + sys.firefox)
    if (sys.chrome) return ('Chrome: ' + sys.chrome)
    if (sys.opera) return ('Opera: ' + sys.opera)
    if (sys.safari) return ('Safari: ' + sys.safari)
    return 'Unkonwn'
}
```
## 根据name读取cookie
```javascript
/**
 * 
 * @desc 根据name读取cookie
 * @param  {String} name 
 * @return {String}
 */
function getCookie(name) {
    var arr = document.cookie.replace(/\s/g, "").split(';');
    for (var i = 0; i < arr.length; i++) {
        var tempArr = arr[i].split('=');
        if (tempArr[0] == name) {
            return decodeURIComponent(tempArr[1]);
        }
    }
    return '';
}
```
## 设置Cookie
```javascript
/**
 * 
 * @desc  设置Cookie
 * @param {String} name 
 * @param {String} value 
 * @param {Number} days 
 */
function setCookie(name, value, days) {
    var date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = name + '=' + value + ';expires=' + date;
}
```
## 函数节流
```javascript
/**
 * @desc   函数节流。
 * 适用于限制`resize`和`scroll`等函数的调用频率
 *
 * @param  {Number}    delay          0 或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
 * @param  {Boolean}   noTrailing     可选，默认为false。
 *                                    如果noTrailing为true，当节流函数被调用，每过`delay`毫秒`callback`也将执行一次。
 *                                    如果noTrailing为false或者未传入，`callback`将在最后一次调用节流函数后再执行一次.
 *                                    （延迟`delay`毫秒之后，节流函数没有被调用,内部计数器会复位）
 * @param  {Function}  callback       延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
 *                                    执行去节流功能时，调用`callback`。
 * @param  {Boolean}   debounceMode   如果`debounceMode`为true，`clear`在`delay`ms后执行。
 *                                    如果debounceMode是false，`callback`在`delay` ms之后执行。
 *
 * @return {Function}  新的节流函数
 */
module.exports = function throttle(delay, noTrailing, callback, debounceMode) {

    // After wrapper has stopped being called, this timeout ensures that
    // `callback` is executed at the proper times in `throttle` and `end`
    // debounce modes.
    var timeoutID;

    // Keep track of the last time `callback` was executed.
    var lastExec = 0;

    // `noTrailing` defaults to falsy.
    if (typeof noTrailing !== 'boolean') {
        debounceMode = callback;
        callback = noTrailing;
        noTrailing = undefined;
    }

    // The `wrapper` function encapsulates all of the throttling / debouncing
    // functionality and when executed will limit the rate at which `callback`
    // is executed.
    function wrapper() {

        var self = this;
        var elapsed = Number(new Date()) - lastExec;
        var args = arguments;

        // Execute `callback` and update the `lastExec` timestamp.
        function exec() {
            lastExec = Number(new Date());
            callback.apply(self, args);
        }

        // If `debounceMode` is true (at begin) this is used to clear the flag
        // to allow future `callback` executions.
        function clear() {
            timeoutID = undefined;
        }

        if (debounceMode && !timeoutID) {
            // Since `wrapper` is being called for the first time and
            // `debounceMode` is true (at begin), execute `callback`.
            exec();
        }

        // Clear any existing timeout.
        if (timeoutID) {
            clearTimeout(timeoutID);
        }

        if (debounceMode === undefined && elapsed > delay) {
            // In throttle mode, if `delay` time has been exceeded, execute
            // `callback`.
            exec();

        } else if (noTrailing !== true) {
            // In trailing throttle mode, since `delay` time has not been
            // exceeded, schedule `callback` to execute `delay` ms after most
            // recent execution.
            //
            // If `debounceMode` is true (at begin), schedule `clear` to execute
            // after `delay` ms.
            //
            // If `debounceMode` is false (at end), schedule `callback` to
            // execute after `delay` ms.
            timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
        }

    }

    // Return the wrapper function.
    return wrapper;

};
```
## 函数防抖
*依赖throttle
```javascript
/**
 * @desc 函数防抖 
 * 与throttle不同的是，debounce保证一个函数在多少毫秒内不再被触发，只会执行一次，
 * 要么在第一次调用return的防抖函数时执行，要么在延迟指定毫秒后调用。
 * @example 适用场景：如在线编辑的自动存储防抖。
 * @param  {Number}   delay         0或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
 * @param  {Boolean}  atBegin       可选，默认为false。
 *                                  如果`atBegin`为false或未传入，回调函数则在第一次调用return的防抖函数后延迟指定毫秒调用。
                                    如果`atBegin`为true，回调函数则在第一次调用return的防抖函数时直接执行
 * @param  {Function} callback      延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
 *                                  执行去抖动功能时，，调用`callback`。
 *
 * @return {Function} 新的防抖函数。
 */
function debounce(delay, atBegin, callback) {
    return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
};
```
## 格式化${startTime}距现在的已过时间
```javascript
/**
 * @desc   格式化${startTime}距现在的已过时间
 * @param  {Date} startTime 
 * @return {String}
 */
function formatPassTime(startTime) {
    var currentTime = Date.parse(new Date()),
        time = currentTime - startTime,
        day = parseInt(time / (1000 * 60 * 60 * 24)),
        hour = parseInt(time / (1000 * 60 * 60)),
        min = parseInt(time / (1000 * 60)),
        month = parseInt(day / 30),
        year = parseInt(month / 12);
    if (year) return year + "年前"
    if (month) return month + "个月前"
    if (day) return day + "天前"
    if (hour) return hour + "小时前"
    if (min) return min + "分钟前"
    else return '刚刚'
}
```
## 格式化现在距${endTime}的剩余时间
```javascript
/**
 * 
 * @desc   格式化现在距${endTime}的剩余时间
 * @param  {Date} endTime  
 * @return {String}
 */
function formatRemainTime(endTime) {
    var startDate = new Date(); //开始时间
    var endDate = new Date(endTime); //结束时间
    var t = endDate.getTime() - startDate.getTime(); //时间差
    var d = 0,
        h = 0,
        m = 0,
        s = 0;
    if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
    }
    return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
}
```
## 从url获取params
```javascript
/**
 *
 * @desc 从url获取params
 * @params key 需要获取的key值
 * @return String
 */
export const getQueryStringValue = (key) => {
  return decodeURIComponent(location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"))
}

export const getURLParameters = () =>
  location.href.match(/([^?=&]+)(=([^&]*))/g).reduce(
    (a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
  );
```

## base64
```javascript

function b64DecodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function b64EncodeUnicode(str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    function toSolidBytes(match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
}

```

## 滚动到顶部
```javascript
const scrollToTop = _ => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;

  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
```

## URL参数
```javascript
/*
 * return { key: value, ... }
 **/
const getUrlParameters = url =>

  url.match(/([^?=&]+)(=([^&]*))/g).reduce(

    (a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}

  );
```
## 生成指定范围数字数组
```javascript
/*
 * @param start,end
 * eg: range(1,3) => [1, 2]
 **/
const range = (start, end) => new Array(end - start).fill(start).map((el, i) => start + i);
```
## deepcopy
```javascript
/**
 * Object deepclone
 * @param {Object} obj the object need clone
 */
module.exports = function deepclone (obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(v => {
      if (typeof v === 'object' && v !== null) return deepclone(v)
      else return v
    })
  } else {
    const newObj = {}

    Object.keys(obj).forEach(v => {
      if (typeof obj[v] === 'object' && obj[v] !== null) {
        newObj[v] = deepclone(obj[v])
      } else {
        newObj[v] = obj[v]
      }
    })

    return newObj
  }
}
```
