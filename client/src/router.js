import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signin from './views/Signin.vue'
import Watchlists from './views/Watch_lists'
import Search from './views/Search.vue'
import Movie from './views/Movie.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin

    },
    {
      path: '/watch_lists',
      name: 'Watch_lists',
      component: Watchlists
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
