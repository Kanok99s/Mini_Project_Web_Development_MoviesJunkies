<template>
  <div class="container">

      <h4 class="header"> Watchlist: </h4>

      <h5 class="list-title" > {{ list.title }} </h5>

           <div class="movie-list">
            <ul v-if="layout === 'list'" class="card-list" :style="listStyle">

          <li v-for="movie in movies" :key="movie.id">
            <router-link :to="/movie_details/ + movie._id">
              <h4 class="movie-list-item"> {{ movie.name }}
               </h4>

               <img :src="movie.img" alt="test" />
            </router-link>
            </li>
           </ul>
<hr>
          </div>
          <button class="delete-btn"  @click="deleteList()"> Delete list </button>
  </div>
</template>

<script>

import { Api } from '@/Api'

export default {
  components: { },
  name: 'Watchlist',
  data() {
    return {
      list: {},
      movies: [],
      layout: 'list',
      numberOfColumns: 2
    }
  },

  created() {
    this.getListMovies()
  },

  computed: {
    listStyle() {
      return {
        listTemplateColumns: `repeat(${this.numberOfColumns}, minmax(100px, 1fr))`
      }
    }
  },

  async mounted() {
    const listResult = await Api.get('/watch_lists/' + this.$route.params.id)
    console.log(listResult.data)
    this.list = listResult.data

    const movieListResult = await Api.get('/watch_lists/' + this.$route.params.id + '/movies')
    this.movies = movieListResult.data

    {
      const user = localStorage.getItem('user')
      if (!user) {
        this.$router.push({ name: 'login' })
        alert('Please log in first')
      }
    }
  },

  methods: {
    getListMovies() {
      Api.get('watch_lists/' + this.$route.params.id + '/movies')
        .then((response) => {
          console.log(response.data)
          this.movie = response.data.movie
        })
        .then((response) => {
          if (this.movies.length > 0) {
            this.loading = false
            this.loaded = true
          }
        })
        .catch((error) => {
          this.message = error
          console.log(error)
        })
    },
    deleteList() {
      Api.delete('/watch_lists/' + this.$route.params.id).then((response) => {
        console.log(response.data)
        this.$router.push('/watch_lists')
      })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
/* updateList() {
    const updatedList = {
      title: this.title,
      movies: this.movies
    }
    Api.patch('/watch_lists' + this.$route.params.id, updatedList).then(response => {
      this.$router.push('/watch_lists')
      console.log(response)
    })
  }
 */

</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: monospace, Avenir, Helvetica, Arial, sans-serif;
}

img {
  width: 230px;
  height: 320px;
  object-fit: cover;
  border-radius: 8px;
}

h4{
  color: #ffffff;
}

a > h4 {
  color: #321e23;
  font-size: 18px;
}

  .header {
    font-weight: bold;
    text-decoration: underline;
    margin: 1em;
  }
.list-title {
  background: #c45c4c;
  color: #ffffff;
    font-size: 26px;
  font-weight: bold;
  padding: 0.3em;
  text-align: center;
}
.delete-btn{
background-color: #998998;
font-size: medium;
color: white;
font-size: 20px;
margin: 2em;
padding: 10px 20px;
border-radius: 12px;
transition-duration: 0.4s;
display:inline;

}
.delete-btn:hover {
background-color: #e9d9e7;
color: rgb(113, 100, 100);
text-align: center;
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
.card-list {
  display: list-item;
  grid-gap: 2em;
}

ul{
 list-style: none;
}

li{
  padding: 8px;
  display:inline-block
}
</style>
