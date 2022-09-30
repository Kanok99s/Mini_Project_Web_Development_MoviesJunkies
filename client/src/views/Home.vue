<template>

    <div class="input-group-append">
    <input type="text" ref="get_id" class="form-control ml-2" placeholder="enter movieId" />
            <b-button class="bttn" v-on:click="getMovie()">Get movie</b-button>
            <tr v-for="movie in movies" :key="movie._id">
              </tr>
        </div>

</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'home',
  components: { },

  data() {
    return {
      movies: [],
      movie: { name: '', img: '', genre: '', age_rating: '', review_rating: '', language: '', description: '' }
    }
  },
  methods: {
    getMovie() {
      Api.get('/movies/' + this.$route.params.id)
        .then(response => {
          this.movie = response.data
        })
        .catch(error => {
          this.movie = error
        })
    }
  }
}

</script>

<style>

</style>
