<template>
	<view>
		<camera device-position="front" flash="off" class="camara" @error="error" v-if="showCamera"></camera>
		<image mode="widthFix" class="image" :src="photoPath" v-if="showImage"></image>
		<view class="operate-container">
			<button type="primary" class="btn" @tap="clickBtn" :disabled="canCheckin">{{btnText}}</button>
			<button type="warn" class="btn" @tap="afresh" :disabled="canCheckin">重拍</button>
		</view>
		<view class="notice-container">
			<text class="notice">注意事项</text>
			<text class="desc">拍照签到的时候，必须要拍摄自己的正面照片，侧面照片会导致无法识别。另外，拍照的时候不要戴墨镜或者帽子，避免影响拍照签到的准确度。</text>
		</view>
	</view>
</template>

<script>
	var QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js');
	var qqmapsdk;
	
	export default {
		data() {
			return {
				// 启动程序默认值
				canCheckin: false,
				photoPath: '',
				btnText: '拍照',
				showCamera: true,	// 默认显示carama标签
				showImage: false	// 默认隐藏image标签		
			}
		},
		// 生命周期回调函数
		onLoad() {
			qqmapsdk = new QQMapWX({
				key:"XXXXX"
			})
		},
		methods: {
			clickBtn:function(){
				let that = this
				// 点击拍照
				if (that.btnText == "拍照") {
					let ctx = uni.createCameraContext();
					ctx.takePhoto({
						quality:"high",
						success:function(resp){
							console.log(resp.tempImagePath)
							that.photoPath = resp.tempImagePath
							that.showCamera = false
							that.showImage = true
							that.btnText = "签到"
						}
					})
				}
				// 点击签到，上传照片和位置信息
				else {
					// 后端处理人脸识别 & 得到风险级别需要等待时间
					uni.showLoading({
						title:"签到中请稍后"
					})
					setTimeout(function(){
						uni.hideLoading()
					}, 10000)
					
					// 获得当前GPS坐标
					uni.getLocation({
						type:"wgs84",
						success:function(resp){
							let latitude = resp.latitude
							let longitude = resp.longitude
							// console.log(latitude)
							// console.log(longitude)
							
							// 通过腾讯位置服务，把经纬度解析为具体位置
							qqmapsdk.reverseGeocoder({
								location:{
									latitude:latitude,
									longitude:longitude
								},
								success:function(resp){
									console.log(resp.result)
									let address = resp.result.address;
									let addressComponent = resp.result.address_component;
									// 具体地理位置
									let nation = addressComponent.nation;
									let province = addressComponent.province;
									let city = addressComponent.city;
									let district = addressComponent.district;
								}
							})
						}
					})
				}
			},
			afresh:function(){
				let that = this
				that.showCamera = true
				that.showImage = false
				that.btnText = "拍照"
			}
		}
	}
</script>

<style lang="less">
	@import url("checkin.less");
</style>
