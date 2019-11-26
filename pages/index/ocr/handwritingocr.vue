<template>
	<view class="base">
		
		<text class="title">{{title}}</text>
		<view class="text-area" style="width:90%; border:#8F8F94 solid 1px;margin: 10rpx 0;">
			<input class="uni-input" v-model="text" type="text" confirm-type='search'  style='height: auto;min-height: 250rpx;min-width: 200rpx;' />
		</view>			
		<button type="warn" style="width: 50%;margin-bottom: 10rpx;" @click="search()">从相册选取</button>
		
		<load :status="loadModal" :text="loadModalText"></load>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				loadModal:false,
				loadModalText:'识别中...',
				text:'',
				content:'结果：',
				title: '手写文字识别',
				type:0
			}
		},
		methods: {
			//机器翻译
			search(){
				if(!this.text)return false;
				this.loadModal = true;
					var url = this.apis.translation;
					//请求
					var params = {
						'text' : this.text,
						'type':this.type
					};
					uni.request({
						url:url,
						data:params,
						responseType:'json',
						method:'POST',
						success:res=>{
							var data= res.data;
							if(0 == data.code){
								this.content = data.data.trans_text;
							}else{
								this.contentText.contentnomore = '抱歉，系统错误！';
							}
							this.loadModal = false;
						}
					})
			},
			
	
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

</style>
