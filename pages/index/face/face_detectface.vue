<template>
	<view class="base">
		<view class="text-area">
			{{title}}
		</view>
		<view>			
			<view style="margin-top: 10rpx;">	
			<image id="image" :src="imgBase64" :width="face_list.image_width+'rpx'" :height="face_list.image_height+'rpx'">
			<load :status="loadModal" :text="contentText"></load>
			<view style="margin-bottom: 15rpx;">
				<p id="age" class="face_list">年龄:{{face_list.age}}</p>
				<p id="expression" class="face_list">微笑指数:{{face_list.expression}}</p>
				<p id="beauty" class="face_list">魅力值:{{face_list.beauty}}</p>
			</view>
			</view>
			<button type="primary" @click="selectPicture()">打开相册</button>
		</view>
	
	</view>
</template>
<script>
	export default {
		data() {
			return {
				loadModal:false,
				contentText:"笑容分析中...",
				imgBase64:'http://qiniu.17xunle.com/app/image/8f9ad0a1e1a4fb848f898dd64210dafc.jpeg',
				file_path:'',
				title: '笑容分析',
				face_list:{
					age:0,//年龄
					expression:0,//微笑指数
					beauty:0,//魅力值
					image_width:200,
					image_height:356
				}
			}
		},
		methods: {
			//人脸检测与分析
			face_detectface(image){
					this.loadModal = true;
					this.contentText = '笑容分析中...';
					if(undefined != image ){
						this.imgBase64 = image
					}
				
					var url = this.apis.face_detectface;
					var params = {
						'image':this.imgBase64+'_cut',
						'mode':0,
					};
					uni.request({
						url:url,
						data:params,
						header:{
							'Access-Control-Allow-Origin':'*',
						},
						method:'POST',
						success:res=>{
							var data = res.data;
							if(0 === parseInt(data.code)){
								console.log(data.data)
								this.face_list = data.data.face_list[0];
							}else{
								this.contentText.contentnomore = data.msg;
							}
						},
						fail:res=>{
							this.face_detectface();
						},
						complete:res=>{
							this.loadModal = false;
						}
						
					})
			},
			//从相册选择图片
			selectPicture(){		
				//判断权限
				this.galleryImg();
				
	
			},
			// 从相册中选择图片 
			galleryImg() {
				// 从相册中选择图片
				var that = this;
			    plus.gallery.pick(function(path){
					that.createUpload(path);
				}, function ( e ) {
			    	console.log( "取消选择图片" );
			    }, {filter:"image"} );
				
					
					
			},
			
			// 从相册中选择多张图片 
			galleryImgs(){		
				// 从相册中选择图片
			    plus.gallery.pick( function(e){
			    	for(var i in e.files){
				    	console.log(e.files[i]);
			    	}
			    }, function ( e ) {
			    	console.log( "取消选择图片" );
			    },{filter:"image",multiple:true});
			},			
			
			// 创建上传任务
			createUpload(path) {
				this.loadModal = true;
				this.contentText = '图片上传中...';
				var that = this;
				var task = plus.uploader.createUpload(that.apis.upload_image, 
					{ method:"POST",blocksize:204800,priority:100 },
					function ( t, status ) {
						// 上传完成
						if ( status == 200 ) { 
							var res = JSON.parse(task.responseText);
							
							if(0 == res.code){
								that.face_detectface(res.data);
							}
							
						} else {
							this.loadModal = false;
							console.log( "Upload failed: " + status );
						}
					}
				);
				task.addFile(path, {key:"file"} );
				// task.addData( "string_key", "string_value" );
				//task.addEventListener( "statechanged", onStateChanged, false );
				task.start();
			}

		},
		onLoad() {
			this.face_detectface();
		},
	}
</script>

<style scoped>
	.base {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.text-area {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
