<template>
    <div class="container">
        <h1>test</h1>
        <Navbar />
        <div v-for="list in watch_lists" v-bind:key="list._id">
            <router-link :to=" { name: 'list', params: { id: list._id } }"> </router-link>
        </div>
        <button @click="getXlist()" class="btn-gray"> Display</button>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import { Api } from '@/Api'

export default {
  components: { Navbar },
  name: 'xlist',
  date() {
    return {
      watch_lists: {}
    }
  },
  methods: {
    getXlist() {
      Api.get('/watch_lists').then(response => {
        this.watch_lists = response.data.watch_lists
      }).catch(
        error => {
          this.watch_lists = error
          console.log(error)
        })
    }
  }
}
</script>
