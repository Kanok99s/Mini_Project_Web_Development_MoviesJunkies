<template>
  <div id="all">
      <div class="w-350 p-4 d-flex align-items-center justify-content-center">
    <b-card style="width: 600px">
    <b-form @submit="onUpdate" v-if="show">
  <h2> Update this movie details </h2>
      <b-form-group id="name" label="Movie name:" label-for="name">
        <b-form-input
          id="name"
          v-model="movie.name"
          placeholder="Enter movie name"
          required
        ></b-form-input>
      </b-form-group>

    <b-form-group id="language" label="Movie language:" label-for="language">
        <b-form-input
          id="language"
          v-model="movie.language"
          placeholder="Enter movie language"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="age_rating" label="Recommended age (6-20): " label-for="age_rating">
        <b-form-input
          id="age_rating"
          v-model="movie.age_rating"
          placeholder="Select appropriate age"
          required
          type="number"
          min="6"
          max="20"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="genre" label="Genre:" label-for="genre">
        <b-form-select
          id="genre"
          v-model="movie.genre"
          :options="genres"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="review_rating" label="Movie rating: " label-for="review_rating">
        <b-form-input
          id="review_rating"
          v-model="movie.review_rating"
          placeholder="Select movie rating"
          required
          type="range"
          min="1"
          max="10"
          step="0.5"
        ></b-form-input>
        <p>rating: {{ movie.review_rating }}</p>
      </b-form-group>

      <b-form-group id="description" label="Movie description:" label-for="description">
        <b-form-textarea
          id="description"
          v-model="movie.description"
          placeholder="Enter movie description"
          required
        ></b-form-textarea>
      </b-form-group>
      <br><br>
      <b-button type="submit" variant="primary">Update</b-button>
    </b-form>
   </b-card>
</div>
</div>
</template>

<script>
import { Api } from '@/Api'
export default {
  data() {
    return {
      movie: {
        language: '',
        name: '',
        age_rating: null,
        genre: null,
        review_rating: null,
        description: '',
        img: null
      },
      genres: [
        { text: 'Select One', value: null },
        'Action',
        'Animation',
        'Comedy',
        'Drama',
        'Romance',
        'Thrillers',
        'Crime',
        'Sci-fi'
      ],
      show: true
    }
  },
  async mounted() {
    const response = await Api.get(
      '/movies/' + this.$route.params.id)
    this.movie = response.data
    console.log(response.data)

    const user = localStorage.getItem('user')
    if (!user) {
      this.$router.push({ name: 'login' })
      alert('Please log in first')
    }
  },
  methods: {
    // Need to rework patch
    onUpdate() {
      const updatedMovie = {
        language: this.movie.language,
        name: this.movie.name,
        age_rating: this.movie.age_rating,
        genre: this.movie.genre,
        review_rating: this.movie.review_rating,
        description: this.description
      }
      Api.patch('/movies/' + this.$route.params.id, updatedMovie)
        .then(response => {
          console.log(response)
          this.$router.push({ name: 'home' })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
* {
  font-family: monospace, Avenir, Helvetica, Arial, sans-serif;
}

h2{
  font-weight: 700;
}
</style>
