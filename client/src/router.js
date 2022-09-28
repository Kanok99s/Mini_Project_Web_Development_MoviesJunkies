import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signin from './views/Signin.vue'
import Search from './views/Search.vue'
import Movie from './views/Movie.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin

    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/movie',
      name: 'movie',
      component: Movie
    }
  ]
})
