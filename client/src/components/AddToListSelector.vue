<template>
  <div>
    <b-form-select v-model="selected" :options="options" v-on:change="myselect">
      <b-form-select-option :value="null">Please select an option</b-form-select-option>
      <b-form-select-option :value="list._id" v-for="list in watch_lists" :key="list._id">
        {{list.title}}
      </b-form-select-option>
    </b-form-select>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      selected: null,
      watch_lists: [
        { }
      ]
    }
  },
  async mounted() {
    const result = await Api.get('/movies/' + this.$route.params.id)
    console.log(result.data)
    this.movie = result.data
  },
  created() {
    this.getWatchLists()
  },
  methods: {
    getWatchLists() {
      Api.get('/watch_lists').then(response => {
        this.watch_lists = response.data.watch_lists
      }).catch(error => {
        this.watch_lists = error
        console.log(error)
      })
    },
    myselect(e) {
      const selectedList = event.target.value
      const selectedMovie = this.movie._id
      this.addMovieToList(selectedList, selectedMovie)
    },
    addMovieToList(selectedList, selectedMovie) {
      alert(selectedList) // list_id
      alert(selectedMovie) // movie_id
      const result = Api.post('/watch_lists', {
        _id: this.selectedList,
        movies: this.selectedMovie
        // title: this.watch_lists.title,
        // user: '633b510f169feb5010e7456f'

      }).then((response) => {
        const data = response.data
        this.watch_lists.push(data)
        this.movies = this.selectedMovie //
      })
      if (result.status === 201) {
        console.log('List is added')
      } else {
        alert('error')
      }
    }
  }
}
</script>
