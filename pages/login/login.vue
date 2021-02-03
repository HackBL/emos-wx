<template>
	<view>
		<image src="../../static/logo-1.png" class="logo" mode="widthFix"></image>
		<view class="logo-title">EMOS企业在线办公系统</view>
		<view class="logo-subtitle">Ver 2050.2</view>
		<button class="login-btn" open-type="getUserInfo" @tap="login()">登陆系统</button>
		<view class="register-container">
			没有账户？
			<text class="register" @tap="toRegister()">立即注册</text>
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
			toRegister:function(){
				uni.navigateTo({
					url:"../register/register"
				})
			},
			login:function(){
				let that = this
				uni.login({
					provider: "weixin",
					success:function(resp){
						let code = resp.code
						that.ajax(that.url.login, "POST", {"code":code}, function(resp){
							let permission = resp.data.permission
							uni.setStorageSync("permission", permission)
							// TODO 登陆成功，跳转到登陆页面
						})
						console.log("Success")
					},
					// Fail不是AJAX执行错误出发的异常
					// 如果获得临时授权字符串失败，执行此方法
					fail:function(e){
						console.log(e)
						uni.showToast({
							icon:"none",
							title:"执行异常"
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("login.less");
</style>
