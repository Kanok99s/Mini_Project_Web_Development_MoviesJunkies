<template>
    <div class=" grid">
      <div class="container">

          <ul v-if="layout === 'grid'" class="card-list" :style="gridStyle">
            <li v-for="movie in movies" :key="movie.id">
              <img :src="'http://localhost:8080/'+movie.img" alt="test"/>
              <div class="listMovies">
                <h3>{{ movie.name }}</h3>
                <p> Movie rating:  {{ movie.review_rating }}</p>
                <a class="btn" href="#">Read more</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
  </template>

<script>

import { Api } from '@/Api'

export default {
  name: 'Movie',
  created() {
    this.getMovies()
  },
  data() {
    return {
      layout: 'grid',
      movies: [],
      numberOfColumns: 4
    }
  },
  computed: {
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.numberOfColumns}, minmax(100px, 1fr))`
      }
    }
  },
  mounted() {
    console.log('Page is loaded')
  },
  methods: {
    getMovies() {
      Api.get('/movies').then(response => {
        this.movies = response.data.movies
        console.log(response.date)
        console.log(this.movies)
      })
    },
    getMovieById() {
      Api.get('/movies/' + this.$route.params.id)
        .then(response => {
          this.movie = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}

</script>

<style scoped>
body {
font-family: monospace;
padding: 30px;
}
img {

    width:  300px;
    height: 400px;
    object-fit: cover;
}
.btn {
font-weight: bolder;
}
.card-list{
display: grid;
grid-gap: 2em;
}
</style>
