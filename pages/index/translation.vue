<template>
	<view class="base">
		
		<text class="title">{{title}}</text>
		<view class="text-area" style="width:90%; border:#8F8F94 solid 1px;margin: 10rpx 0;">
			<textarea class="uni-input text" v-model="text" type="text" @focus="function(){
				this.text = '';
			}" confirm-type='search'></textarea>
		</view>			
		<button type="warn" style="width: 50%;margin-bottom: 10rpx;" @click="search()">查询</button>
		<!-- <uni-load-more :status="more" :content-text="contentText"  style="margin-bottom: 15rpx;" id="loding"></uni-load-more> -->
		<view class="result">{{content}}</view>
		
		<load :status="loadModal" :text="loadModalText"></load>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				loadModal:false,
				loadModalText:'翻译中...',
				text:'请输入要翻译的语句',
				content:'结果：',
				title: 'AI Lab翻译',
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
	.text{
		height: auto;
		min-height: 300rpx;
	}
	.result{
		width:90%;
	    border:#8F8F94 solid 1px;
		min-height: 300rpx;
		text-align: left;
	}

</style>
