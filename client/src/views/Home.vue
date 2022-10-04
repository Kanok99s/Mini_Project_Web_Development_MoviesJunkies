<template>

<div class="container mx-auto ">
  <div class="flex justify-between border-b border-gray-500"> <Navbar />
   </div>
<Movie>
</Movie>
 </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import Navbar from '../components/Navbar.vue'
import Movie from '../components/Movie.vue'

export default {
  name: 'home',
  components: { Navbar, Movie },

  methods: {

    getMessage() {
      Api.get('/')
        .then((response) => {
          this.message = response.data.message
        })
        .catch((error) => {
          this.message = error
        })
    },
    getMovies() {
      Api.get('/movies').then(response => {
        this.movies = response.data.movies
        console.log(response.date)
      })
    }
  }
}
</script>

<style>
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
box-sizing: border-box
}
body {
  background: src()
}
</style>
