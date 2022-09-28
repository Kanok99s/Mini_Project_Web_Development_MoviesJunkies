<template>
      <div>
      <h1> This is a search page</h1>
      <div>
      <b-button class="btn_pink" v-on:click="deleteAllMovies()">Delete all movies from Server</b-button>
      </div>
      <div>
      <b-button class="btn_pink" v-on:click="getMovies()">Get all movies from Server</b-button>
      <div :key="movie.id" v-for="movie in movies" class="media border p-3 mt-3 mb-3">
      <img src="../assets/video.png" alt="Movie" class="mr-3 mt-3" style="width:150px;">
      <div class="media-body">
            <button type="button" v-on:click="deleteMovie(movie._id)">delete this movie</button>
            <h4> {{ movie.name }} <small></small></h4>
            <h4> {{ movie.genre }} <small></small></h4>
            <h4> {{ movie.age_rating }} <small></small></h4>
            <h4> {{ movie.language }} <small></small></h4>
      </div>
      </div>
      </div>
      </div>
</template>

<script>
import { Api } from '../Api'

export default {
  name: 'search',
  data() {
    return {
      movies: {}
    }
  },
  mounted() {
    console.log('Page is loaded')
  },
  methods: {
    getMovies() {
      Api.get('/movies')
        .then(Response => {
          this.movies = Response.data.movies
        }).catch(error => {
          this.movies = error
          console.log(error)
        })
    },
    deleteMovie(id) {
      Api.delete(`/movies/${id}`)
        .then(response => {
          const index = this.movies.findIndex(movie => movie._id === id)
          this.movies.splice(index, 1)
          console.log('this movie is deleted')
        })
        .catch(error => {
          console.error(error)
        })
    },
    deleteAllMovies() {
      Api.delete('/movies')
        .then(response => {
          console.log('delete all movies')
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>
h1 {
      color:black
}

.btn_pink{
      background-color: white;
      color: black;
      border: 2px solid #c45c4c;
      border-radius: 12px;

}

.btn_pink:hover{
      background-color: #c66151;
      color: white;

}

</style>
