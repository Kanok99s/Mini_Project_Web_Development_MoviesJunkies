<template>
<div>
<div v-for="list in watch_lists" v-bind:key="list.id" class="watch_lists">
  <router-link :to=" { name: 'list', params: { id: list._id } }"> </router-link>
      <b-button class="btn" v-on:click="getUserWatchlists()"> get watchlists </b-button>
      <div>
      <b-button class="btn" v-on:click="deleteList(list._id)"> Delete list</b-button>

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
      value: null
    }
  },
  mounted() {
    console.log('Page is loaded')
  },
  methods: {

    getUserWatchlists(id) {
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

    getUserWatchlistById(userid, listid) {
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
    }
  }
}
</script>

<style scoped>

</style>
