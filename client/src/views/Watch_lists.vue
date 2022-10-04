<template>
<div class="container">
    <Navbar />
    <UserWatchlist />

      <div v-for="list in watch_lists" v-bind:key="list.id" class="watch_lists">
  <router-link :to=" { name: 'list', params: { id: list._id } }"> </router-link>
  <img src="../assets/movie_playlist_icon_159157.png">
<h3> {{ list.title }}</h3></div>

      <div v-for="movie in watch_lists.movies" :key="movie._id">
        <router-link :to="{ name: 'movie', params: { id: movie._id } }"> {{ movie.name }}
          </router-link>
        </div>
      </div>
</template>

<script>

import { Api } from '@/Api'
import Navbar from '../components/Navbar.vue'
import UserWatchlist from '../components/Watchlist.vue'

export default {
  components: { Navbar, UserWatchlist },
  name: 'Watch_lists',
  mounted() {
    console.log('Page is loaded')
  },
  data() {
    return {
      selectedIds: []
    }
  },
  methods: {
    deleteList(id) {
      Api.delete('/watch_lists' + this.$route.params.id).then(response => {
        const index = this.watch_lists.findIndex(list => list._id === id)
        this.watch_lists.splice(index, 1)
      })
    },
    getAllWatchlists(id) {
      Api.get('/users/' + this.$route.params.id + '/watch_lists')
        .then((response) => {
          console.log(response)
          this.watch_lists = response.data
        })
        .catch((error) => {
          this.watch_lists = []
          console.log(error)
        })
    },
    getWatchLists() {
      Api.get('/watch_lists').then(Response => {
        this.list = Response.data
      }).catch(error => {
        this.watch_lists = error
        console.log(error)
      })
    }
  }
}

</script>

<style scoped>
h1{
    color: black;
}

</style>
