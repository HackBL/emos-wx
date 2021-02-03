import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

let baseUrl = "http://192.168.0.12:8080/emos-wx-api"

Vue.prototype.url = {
	register: baseUrl + "/user/register",
	login: baseUrl + "/user/login"
}

Vue.prototype.ajax = function(url, method, data, func) {
	uni.request({
		"url": url,
		"method": method,
		// 把token放入到header中
		"header": {
			token: uni.getStorageSync("token")
		},
		"data": data,
		success: function(resp) {
			// 如果用户没登录就发出请求,直接跳转到登陆页面
			if (resp.statusCode == 401) {
				uni.redirectTo({
					url: "/pages/login/login.vue"
				})
			}
			// HTTP StatusCode & R StatusCode 成功发起请求
			else if (resp.statusCode == 200 && resp.data.code == 200) {
				// 响应数据
				let data = resp.data
				// 响应中带有Token
				// 		1. 注册请求
				// 		2. 登陆请求
				// 		3. 令牌刷新
				// 新的Token存到客户端
				if (data.hasOwnProperty("token")) {
					let token = data.token
					console.log(token)
					uni.setStorageSync("token", token)
				}
				// 通过匿名函数，可以对response进行各种高级的或其他的处理
				func(resp)
			}
			// 后端项目执行出现异常
			else {
				uni.showToast({
					icon: 'none',
					title: resp.data
				});
			}
		}
	})
}