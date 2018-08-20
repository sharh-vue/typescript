import Vue from 'vue'
import './index.css'
import App from './app.vue'
// vue.runtime.esm.js不支持template属性，使用render进行指定
const app = new Vue({
  render: h => h(App)
})
app.$mount('#app')