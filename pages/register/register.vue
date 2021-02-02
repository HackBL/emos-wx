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
				uni.login({
					provider:"weixin",
					success:function(resp){
						console.log(resp.code)
						let code = resp.code
						uni.getUserInfo({
							provider:"weixin",
							success:function(resp){
								let nickName = resp.userInfo.nickName
								let avatarUrl = resp.userInfo.avatarUrl
								console.log(nickName)
								console.log(avatarUrl)
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
