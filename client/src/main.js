import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Signin from './views/Signin.vue'
import Home from './views/Home.vue'
import Movie from './views/Movie.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(BootstrapVue)

Vue.config.productionTip = false
const routes = [
  { path: '/users', component: Signin },
  { path: '/movies', component: Movie },
  { path: '/home', component: Home }
]
const route = new VueRouter({
  routes
})

new Vue({
  router,
  route,
  render: function (h) { return h(App) }
}).$mount('#app')
