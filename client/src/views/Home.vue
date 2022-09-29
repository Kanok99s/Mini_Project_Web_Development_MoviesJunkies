<template>
  <div>
    <MovieItem :key="movie.id" :type="movie.genre" v-for="movie in movies"/>
      <b-button class="btn_movie" v-on:click="getMovie()">Get movie</b-button>

  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import MovieItem from '../components/MovieItem.vue'

export default {
  name: 'home',
  components: { MovieItem },
  computed: {
    movies() {
      return [
      ]
    }
  },
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    geMovie() {
      Api.get('/movies' + this.$route.params.id)
        .then(response => {
          this.movie = response.data
        })
        .catch(error => {
          this.list = error
        })
    }
  }
}

</script>

<style>
.btn_movie {
  background-color: #c45c4c;;

}
</style>
