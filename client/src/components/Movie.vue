<template>
    <div class="switchableGrid">
      <div class="container">

        <div class="bar">
          <div class="btnHolder">
            <button @click="getMovies()" class="btn-black"> Display Movies </button>

            <button :class="{ barActive: layout === 'grid' }" @click="layout= 'grid'"> <i class="fas fa-th"></i> Grid </button>
            <button :class="{ barActive: layout === 'list' }"  @click="layout = 'list'"> <i class="fas fa-list"></i> List </button>
          </div>
        </div>

        <div class="movie">
          <ul v-if="layout === 'grid'" class="grid">
            <li v-for="movie in movies" :key="movie.id">
              <div class="img">
                <img :src="movie.img"/>
              </div>
            </li>
          </ul>

          <ul v-if="layout === 'list'" class="list">
            <li v-for="movie in movies" :key="movie.id">
              <img :src="movie.img" />
              <div class="listMovies">
                <h2>{{ movie.name }}</h2>
                <p>{{ movie.description }}</p>
                <a class="btn" href="#">Read more</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>

<script>

import { Api } from '@/Api'

export default {
  name: 'Movie',
  data() {
    return {
      layout: 'list',
      movies: []

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
