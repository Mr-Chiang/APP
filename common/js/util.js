//处理get请求，传入参数对象拼接
let formatUrl = obj => {
  let params = Object.values(obj).reduce((a, b, i) => `${a}${Object.keys(obj)[i]}=${b}&`, '?');
  return params.substring(0, params.length - 1);
};
//增删改查本地存储
let local = {
  set(key, value) {
    if (checkLocalStorage()) {
      window.localStorage.setItem(key, value);
    } else {
      let Days = 30;
      let exp = new Date();
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      document.cookie = key + '=' + escape(value) + ';expires=' + exp.toGMTString();
    }
  },
  get(key) {
    if (checkLocalStorage()) {
      return window.localStorage.getItem(key) ? window.localStorage.getItem(key) : null;
    } else {
      return getCookie(key);
    }
  },
  clear(key) {
    if (checkLocalStorage()) {
      window.localStorage.removeItem(key);
    } else {
      let exp = new Date();
      exp.setTime(exp.getTime() - 1);
      let cval = getCookie(key);
      if (cval != null) document.cookie = key + '=' + cval + ';expires=' + exp.toGMTString();
    }
  }
};

function checkLocalStorage() {
  //确认是否支持Localstorage
  return window.localStorage && (window.localStorage.setItem('a', 123), window.localStorage.getItem('a') == 123)
    ? true
    : false;
}
function getCookie(name) {
  let arr,
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
}

export default {
  formatUrl,
  local
};