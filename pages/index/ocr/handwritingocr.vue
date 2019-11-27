<template>
	<view class="base">
		
		<text class="title">{{title}}</text>
		<view class="text-area" style="width:90%; border:#8F8F94 solid 1px;margin: 10rpx 0;">
			<image :src="images_url+'_cut'">
		</view>			
		<button type="warn" style="width: 50%;margin-bottom: 10rpx;" @click="selectPicture()">从相册选取</button>
		
		<load :status="loadModal" :text="loadModalText"></load>
		<text class="result" selectable=true>{{content}}</text>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				loadModal:false,
				loadModalText:'识别中...',
				text:'',
				content:'',
				title: '手写文字识别',
				type:0,
				images_url:'',
				data:[],
			}
		},
		methods: {
			//从相册选择图片
			selectPicture(){
				// this.images_url = this.systemFun.init('galleryImg');
				var that = this;
				this.systemFun.galleryImg(function(res){

					if(res.status){
						//上传图片
							that.loadModal = true;
							that.loadModalText = '图片上传中...';
						that.systemFun.createUpload(res.data,that.apis.upload_image,function(result){
							if(result.status){
								that.loadModalText = '识别中...';
								that.images_url = result.data.data;
								that.handwriting();
							}else{
								that.loadModal = false;
							}
						});
					}
				})
			},
			//手写体识别
			handwriting(){
				console.log(this.images_url)
				if(!this.images_url)return false;
					var url = this.apis.handwriting;
					//请求
					var params = {
						'image_url' : this.images_url,
					};
					var that = this;
					uni.request({
						url:url,
						data:params,
						responseType:'json',
						method:'POST',
						success:res=>{
							var data= res.data;
							console.log(data)
							if(0 == data.code){
								that.data = data.data.item_list;
								that.deal();
							}else{
								that.content = '识别失败';
							}
							that.loadModal = false;
						}
					})
			},
			//处理结果
			deal(){
				console.log('结果处理中...')
				this.loadModalText = '结果处理中...'
				var str = '';
				this.data.forEach(item=>{
					str += item.itemstring+'\n';
				})
				this.content = str;
			}
	
		},
		onLoad() {

		},
	}
</script>

<style scoped>
	.base{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.result{
		height:auto;
		width:90%;
	}

</style>
