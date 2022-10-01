<template>
<div class="main-container">
<Lists>
<Movies>

  <div>
    <div
      v-for="list in watch_lists" :key="list._id" >
      <div
        v-for="movie in watch_lists.movies" :key="movie._id">
        <router-link :to="{ name: 'movie', params: { id: movie._id } }"
            >{{ movie.name }}
          </router-link>
      </div>
    </div>
  </div>

</Movies>
   </Lists>

</div>
</template>

<script>

import Lists from '../components/UserWatchlist.vue'
import Movies from '../components/MovieItem.vue'
import { Api } from '@/Api'

export default {
  components: { Lists, Movies },
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
    getWatchLists() {
      Api.get('/watch_lists').then(Response => {
        this.list = Response.data
      }).catch(error => {
        this.watch_lists = error
        console.log(error)
      })
    },
    getListById() {
      Api.get('/watch_lists/' + this.$route.params.id)
        .then(response => {
          this.list = response.data
        })
        .catch(error => {
          this.list = {}
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
h1{
    color: black;
}

</style>
