import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signin from './views/Signin.vue'
import Watchlists from './views/Watch_lists.vue'
import Search from './views/Search.vue'
import Movie from './views/Movie.vue'
import MovieDetails from './views/MovieDetails.vue'
import ManageUsers from './views/ManageUsers.vue'
import UpdateMovie from './views/UpdateMovie.vue'
import AddMovie from './views/AddMovie.vue'

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
      name: 'signin',
      component: Signin
    },
    {
      path: '/watch_lists/:id',
      name: 'Watch_lists',
      component: Watchlists
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/add_movie',
      name: 'add_movie',
      component: AddMovie
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: Movie
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
    }
  ]
})
