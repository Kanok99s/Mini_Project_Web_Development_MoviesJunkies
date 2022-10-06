<template>
    <div class=" grid">
    <div class="container">

      <Navbar />
        <ul class="card-list">
          <li v-for="list in watch_lists" :key="list._id">
            <img src="../assets/movie_playlist_icon_159157.png" alt="test"/>
            <div class="lists_info">
              <h3>{{ list.title }}</h3>
          <!-- <a class="btn" @click=" getXlist(id)"> Display</a> -->
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>

import { Api } from '@/Api'
import Navbar from '../components/Navbar.vue'

export default {
  components: { Navbar },
  name: 'Watch_lists',

  created() {
    this.getWatchLists()
  },

  mounted() {
    console.log('Page is loaded')
  },
  data() {
    return {
      watch_lists: []
    }
  },
  methods: {
  /*  deleteList(id) {
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
    }, */
    getWatchLists() {
      Api.get('/watch_lists').then(response => {
        this.watch_lists = response.data.watch_lists
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
.img {
  width:  40px;
    height: 40px;
    object-fit: cover;
}

</style>
