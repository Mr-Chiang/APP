<template>
	<!-- 加载动画 -->
	<view class="cu-load load-modal" v-if="loadStatus">
		<!-- <view class="cuIcon-emojifill text-orange"></view> -->
		<image src="/static/logo.png" mode="aspectFit"></image>
		<view class="gray-text">{{loadText}}</view>
	</view>
</template>
<script>
	export default {
		props:['status','text'],
		data() {
			return {
				loadStatus:this.status,
				loadText:'undefined' != this.text?this.text:'加载中...'
			}
			
		},
		methods: {
	
		},
		onLoad() {

		},
		watch:{
			'status':function(data){
				this.loadStatus = data
			},
			'text':function(data){
				this.loadText = data
			}
		}
	}
</script>

<style>

</style>
