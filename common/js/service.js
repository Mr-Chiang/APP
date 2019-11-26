
import qs from 'qs';
import axios from 'axios';
// import { Message } from 'iview';
import utils from './util';

let baseUrl = ''; //设置你的baseUrl

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
//设置token
// function setToken() {
//   if (utils.local.get('token')) {
//     // axios.defaults.headers.common['token'] = utils.getLocal('token');
//   }
// }

//请求验证拦截器
axios.interceptors.request.use(config => {
	config.headers.common['Access-Control-Allow-Origin'] = '*';
  return config;
});
//返回数据拦截器
axios.interceptors.response.use(res => {
  return res;
});

//封装请求方法
function formatReq(type, url, data) {
  // setToken();
  return new Promise((reslove, reject) => {
    axios({
      method: type,
      url: `${baseUrl}${url}`,
      headers: {
        //这里的请求头与后台商量设置
        // 'content-Type': 'application/x-www-form-urlencoded',
		'Access-Control-Allow-Origin':'*',
      },
      cancelToken: source.token,
      data: data
    })
      .then(r => {
 
        //这里可以添加指定对应状态码的处理方式,比如登陆过期,res.data.code === '6666' 路由跳转到login
        reslove(r);
      })
      .catch(e => {

        reject(e.message);
        // Message.error(e.message);
      });
  });
}

const Http = {
  get: (url, query) => {
    url = utils.formatUrl(url, query);
    // setToken();
    return axios.get(`${baseUrl}${url}`, { cancelToken: source.token }).then(r => r);
  },
  post: (url, data) => formatReq('post', url, data),
  put: (url, data) => formatReq('put', url, data),
  patch: (url, data) => formatReq('patch', url, data),
  delete: (url, data) => formatReq('delete', url, data)
};

export default Http;