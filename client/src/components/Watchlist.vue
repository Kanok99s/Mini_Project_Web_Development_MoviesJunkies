<template>
<div class="container">
<div v-for="list in watch_lists" v-bind:key="list.id" class="watch_lists">
  <router-link :to=" { name: 'list', params: { id: list._id } }"> </router-link>
  <div  v-for="movie in watch_lists.movies" :key="movie._id">
        <router-link :to="{ name: 'movie', params: { id: movie._id } }"></router-link>
      </div>
      </div>
      </div>
    </template>

<script>

import { Api } from '@/Api'

export default {

  name: 'Watch_lists',
  props: ['list'],
  data() {
    return {
      watch_lists: {},
      userid: localStorage.userid
    }
  },
  mounted() {
    console.log('Page is loaded')
  },
  methods: {

    getWatchlistById(userid, listid) {
      Api.get('/users/' + userid + '/watch_lists' + listid)
        .then((response) => {
          this.watch_lists = response.data.watch_lists
          console.log(response.data.watch_lists)
        })
        .catch((error) => {
          this.watch_lists = error
        })
    },

    deleteList(id) {
      Api.delete('/watch_lists' + this.$route.params.id).then(response => {
        const index = this.watch_lists.findIndex(list => list._id === id)
        this.watch_lists.splice(index, 1)
        console.log('Deleted successfully!')
      })
        .catch(error => {
          console.error(error)
        })
    },
    createList() {
      Api.post('/watch_lists').then((response) => {
        this.watch_lists = response.data
        console.log(response.data)
      })
        .catch((error) => {
          console.error(error)
        })
    },
    getListById() {
      Api.get('/watch_lists/' + this.$route.params.id)
        .then(response => {
          this.watch_lists = response.data
        })
        .catch(error => {
          this.watch_lists = {}
          console.log(error)
        })
    },
    updateList() {
      const updatedList = {
        title: this.title,
        movies: this.movies
      }
      Api.patch('/watch_lists' + this.$route.params.id, updatedList).then(response => {
        this.$router.push('/watch_lists')
        console.log(response)
      })
    }
  }
}
</script>

<style scoped>

</style>
