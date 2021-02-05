<template>
	<view>
		<image src="../../static/logo-2.png" class="logo" mode="widthFix"></image>
		<view class="register-container">
			<input type="text" placeholder="输入你的激活码" class="register-code" maxlength="6" v-model="registerCode" />
			<view class="register-desc">管理员创建员工证账号之后，你可以从你的个人邮箱中获得注册邀请码</view>
			<button class="register-btn" open-type="getUserInfo" @tap="register()">执行注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			register:function(){
				let that = this
				if (that.registerCode == null || that.registerCode.length == 0) {
					uni.showToast({
						icon: "none",
						title: "激活码不能为空"
					});
					return;
				}
				else if (/^[0-9]{6}$/.test(that.registerCode) == false) {
					uni.showToast({
						icon: "none",
						title: "激活码必须是6为数字"
					});
					return;
				}
				
				uni.login({
					provider:"weixin",
					success:function(resp){
						// console.log(resp.code)
						let code = resp.code
						uni.getUserInfo({
							provider:"weixin",
							success:function(resp){
								let nickName = resp.userInfo.nickName
								let avatarUrl = resp.userInfo.avatarUrl
								// console.log(nickName)
								// console.log(avatarUrl)
								
								// 封装用户信息以及激活码
								let data = {
									code: code,
									nickname: nickName,
									photo: avatarUrl,
									registerCode: that.registerCode
								};
								// 调用AJAX
								that.ajax(that.url.register, "POST", data, function(resp){
									let permission = resp.data.permission
						 			uni.setStorageSync("permission", permission)

									console.log(permission)
								    // 注册成功，跳转到首页
									uni.switchTab({
										url: "../index/index"
									})
								});								
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("register.less");
</style>
