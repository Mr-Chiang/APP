import axios from 'axios';
import apis from './api.js';
import {hex_md5} from '../../static/js/md5.js'

//应用配置
export const AIConfig = {
	//腾讯AI应用配置
	"tencent" :{
		'app_key':'G86GWBi9uzeq1oGy',
		'app_id':2123643531,
	}
}

//生成腾讯AI签名
export function tencentSign(params){
	//按字典排序
	var aa = objKeySort(params);
	// 拼按URL键值对
	let bb = '';
	Object.keys(aa).forEach((key, i) => {
	  if (aa[key] !== ''){
	    bb += key + '=' + encodeURIComponent(aa[key]) + '&'
	  }
	});
	
	// 拼接app_key
	
	let str = `${bb}app_key=${AIConfig.tencent.app_key}`
	
	str = hex_md5(str).toUpperCase();
	return str;
}
//字典排序
export function objKeySort(obj) {//排序的函数
    var newkey = Object.keys(obj).sort();
　　//先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    var newObj = {};//创建一个新的对象，用于存放排好序的键值对
    for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
        newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj;//返回排好序的新对象
}

/**
 * JS生成随机字符串
 * @param {Number} len 字节长度
 */
export function randomString(len) {
  len = len || 32;
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length;
  var pwd = '';
  for (var i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

//获取图片base64编码
export function fugetImgToBase64(url){
		imgBase64 = '';
		var canvas = document.createElement('canvas'),
		ctx = canvas.getContext('2d'),
		img = new Image;

		img.crossOrigin = 'Anonymous';
		img.onload = function(){
			canvas.height = img.height;
			canvas.width = img.width;
			ctx.drawImage(img,0,0);
			var dataURL = canvas.toDataURL('image/png');
			imgBase64 = dataURL;
			canvas = null;
			return imgBase64;
		};
		img.src = url;
	}
	
export function getBase64Image(img) {
					
					console.log("初始化canvas")
					let canvas = uni.createCanvasContent('canvas');
				
					canvas.width = img.width;
					canvas.height = img.height;
					var ctx = canvas.getContext("2d");
					ctx.drawImage(img, 0, 0, img.width, img.height);
					var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
					var dataURL = canvas.toDataURL("image/" + ext);
					return dataURL;
				
				}
				
export function dataURLtoFile(dataurl, filename) {
	    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
	        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
	    while(n--){
	        u8arr[n] = bstr.charCodeAt(n);
	    }
	    return new File([u8arr], filename, {type:mime});
	}