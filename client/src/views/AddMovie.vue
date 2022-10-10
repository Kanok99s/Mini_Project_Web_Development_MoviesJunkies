<template>
   <div>
  <div class="w-350 p-4 d-flex align-items-center justify-content-center">
    <b-card style="width: 600px">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <h2> Add new movie here </h2>
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
      <!-- <b-form-file v-model="movie.img" class="mt-3" plain>Select Photo</b-form-file> -->
      <input type="file" @change="onFileSelected">
      <br><br>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
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
  methods: {
    onFileSelected(event) {
      this.img = event.target.files[0]
    },
    async onSubmit() {
      const formData = new FormData()
      formData.append('img', this.img)
      formData.append('name', this.movie.name)
      formData.append('language', this.movie.language)
      formData.append('review_rating', Number(this.movie.review_rating))
      formData.append('age_rating', this.movie.age_rating)
      formData.append('genre', this.movie.genre)
      formData.append('description', this.movie.description)
      const response = await Api.post('/movies', formData)
      this.$router.push({ name: 'home' })
      console.log(response)
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.movie.language = ''
      this.movie.name = ''
      this.movie.age_rating = null
      this.movie.review_rating = null
      this.movie.genre = null
      this.movie.description = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  },
  mounted() {
    const user = localStorage.getItem('user')
    if (!user) {
      this.$router.push({ name: 'login' })
      alert('Please log in first')
    }
  }
}
</script>

<style scoped>
h2{
  font-weight: 700;
}
</style>
