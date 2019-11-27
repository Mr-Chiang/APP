const baseUrl = 'http://server.17xunle.com:18399/api';
// const baseUrl = 'http://server.17xunle.com/api';

const apis = {
	'handwriting':baseUrl+'/handwriting',//手写文字识别
	'face_detectface':baseUrl+'/face_detect_face',//人脸检测与识别
	'translation':baseUrl+'/translation',//翻译
	'upload_image':baseUrl+'/upload_image',//图片上传
}
export {
	baseUrl,apis
}