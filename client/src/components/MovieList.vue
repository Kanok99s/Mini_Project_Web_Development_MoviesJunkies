<template>
  <body>
    <div class=" grid">
      <div class="container">
        <ul v-if="layout === 'grid'" class="card-list" :style="gridStyle">
          <li v-for="movie in movies" :key="movie.id">
            <img :src="'http://localhost:3000/' + movie.img" alt="test" />
            <div class="movie-info">
              <h3>{{ movie.name }}</h3>
              <h6>Movie rating: {{ movie.review_rating }}</h6>
              <p>
                <router-link :to="/movie_details/ + movie._id"
                  >Read more</router-link
                >
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </body>
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
          this.movie = response.data.movie
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 400){
  img {
  width: 170px;
  height: 190px;
  object-fit: cover;}
}

* {
  box-sizing: border-box;
}

body {
  font-family: monospace;
  padding: 10px;
  display: flex;
}

img {
  width: 240px;
  height: 350px;
  object-fit: cover;
  border-radius: 8px;
}

.btn {
  font-weight: bolder;
}

.card-list {
  display: grid;
  grid-gap: 2em;
}

a{
  text-decoration: none;
}

a:link, a:visited {
  background-color: white;
  color: #321e23;
  border: 2px solid #eec3c0;
  border-radius: 10px;
  padding: 2px 6px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}

a:hover, a:active {
  background-color: #eec3c0;
  color: white;
}

ul{
 list-style: none
}

</style>
