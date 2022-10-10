import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Watchlists from './views/Watch_lists.vue'
import MovieDetails from './views/MovieDetails.vue'
import ManageUsers from './views/ManageUsers.vue'
import UpdateMovie from './views/UpdateMovie.vue'
import AddMovie from './views/AddMovie.vue'
import WatchlistView from './views/WatchlistView'
import SignUp from './views/SignUp.vue'

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
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/watch_lists',
      name: 'Watch_lists',
      component: Watchlists
    },
    {
      path: '/add_movie',
      name: 'add_movie',
      component: AddMovie
    },

    {
      path: '/movie_details/:id',
      name: 'movie_details',
      component: MovieDetails
    },
    {
      path: '/manageusers',
      name: 'manageusers',
      component: ManageUsers
    },
    {
      path: '/update/:id',
      name: 'update',
      component: UpdateMovie
    },
    {
      path: '/watch_lists/:id/details',
      name: 'watchlist',
      component: WatchlistView,
      props: true

    }
  ]
})
