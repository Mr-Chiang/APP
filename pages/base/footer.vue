<template>
	<!-- 底部导航栏 -->
	<view class="cu-bar tabbar bg-white">
			<view :class="{'action':true,'text-gray':curr!='FaceDetectface','text-blue':curr=='FaceDetectface'}" @click="changeTabr('FaceDetectface')">
				<view class="cuIcon-homefill"></view>笑容分析
			</view>
			<view :class="{'action':true,'text-gray':curr!='Translation','text-blue':curr=='Translation'}" @click="changeTabr('Translation')">
				<view class="cuIcon-similar"></view> 翻译
			</view>
			<view class="action text-gray add-action">
				<button class="cu-btn cuIcon-add bg-blue shadow"></button>
				发布
			</view>
			<view :class="{'action':true,'text-gray':curr!='Handwritingocr','text-blue':curr=='Handwritingocr'}" @click="changeTabr('Handwritingocr')">
				<view class="cuIcon-cart">
					<view class="cu-tag badge">新</view>
				</view>
				文字识别
			</view>
			<view class="action text-gray">
				<view class="cuIcon-my">
					<view class="cu-tag badge"></view>
				</view>
				wode
			</view>
	</view>
</template>
<script>
	export default {
		props:['currentView'],
		data() {
			return {
				curr:this.currentView,
			}
			
		},
		methods: {
			//切换页面
			changeTabr(data){
				this.$emit('changeTabr',data)
			}
	
		},
		onLoad() {
			
		},
		watch:{
			'currentView':function(data){
				this.curr = data;
			}
		}
		
	}
</script>

<style>

</style>
