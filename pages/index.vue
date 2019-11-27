<template>
	<view class="base">
		<view class="header"></view>
		<!-- 内容 -->
		<view class="content">
			<Translation v-if="currentView=='Translation'">翻译页面</Translation>
			<FaceDetectface v-if="currentView=='FaceDetectface'">人脸检测页面</FaceDetectface>
			<Handwritingocr v-if="currentView=='Handwritingocr'">文字识别页面</Handwritingocr>
		</view>
		
		<view class="footer">
			<Footer v-on:changeTabr="changeTabr" :currentView="currentView"></Footer>
		</view>
	</view>
</template>
<script>
	import Footer from './base/footer.vue';
	import Translation from './index/translation.vue';
	import FaceDetectface from './index/face/face_detectface.vue';
	import Handwritingocr from './index/ocr/handwritingocr.vue';
	export default {
		components:{
			Footer,
			Translation,//翻译
			FaceDetectface,//人脸检测
			Handwritingocr,//文字识别
		},
		data() {
			return {
				currentView:'Handwritingocr'
			}
			
		},
		methods: {
			changeTabr(data){
				this.currentView = data;
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
		height: 100vh;
		justify-content: flex-start;
		position:relative;
	}
	.content::-webkit-scrollbar {
		display: none;
	}
	.content{
		height: inherit;
		max-height: 90vh;
		/* display:flex; */
		overflow:auto;
	}
	.footer{
		width: 100%;
		position: absolute;
		bottom: 0;
		x:0
	}

</style>
