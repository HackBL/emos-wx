import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

let baseUrl="http://192.168.0.12:8080/emos-wx-api"

Vue.prototype.url={
	register:baseUrl+"/user/register"
}