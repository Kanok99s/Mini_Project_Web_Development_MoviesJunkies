<template>
      <div>
  <div class="container my-5">
      <div class="row">
      <div class="col-md-6" >
       <img :src="'http://localhost:3000/' + movie.img" alt="test" />
      </div>
      <div class="col-md-6" id="details">
      <h1>{{ movie.name }}</h1>
      <h5>Genre: <span class="tag">{{ movie.genre }}</span></h5>
      <h5>Rating review: {{ movie.review_rating }}</h5>
      <h5>Language: {{ movie.language }}</h5>
      <h5>Recommended audience: {{ movie.age_rating }} +</h5>
      <br><hr><br>
      <p> synopsis: </p>
      <p> {{ movie.description }}</p>
      <div>
      <b-button variant="outline-warning" class="edit"><router-link :to="/update/ + movie._id">Edit</router-link></b-button>
      <b-button variant="outline-danger" @click="removePost(movie._id)">Delete</b-button>
      </div>
      </div>
      </div>
  </div>
  <hr>
  <comment-list v-if="comments.length" :comments="comments"></comment-list>
  <br>
  <add-comment @comment-submitted="addComment"></add-comment>
  </div>
</template>

<script>
import { Api } from '@/Api'
import AddComment from '../components/AddComment.vue'
import CommentList from '../components/CommentList.vue'

export default {
  components: { AddComment, CommentList },
  name: 'Movie',
  data() {
    return {
      movie: {},
      comments: []
    }
  },
  async mounted() {
    const result = await Api.get('/movies/' + this.$route.params.id)
    console.log(result.data)
    this.movie = result.data

    const commentsResult = await Api.get('/movies/' + this.$route.params.id + '/comments')
    this.comments = commentsResult.data

    const user = localStorage.getItem('user')
    if (!user) {
      this.$router.push({ name: 'login' })
      alert('Please log in first')
    }
  },
  methods: {
    addComment(comment) {
      this.comments.push(comment)
    },
    async removePost(id) {
      const response = await Api.delete('/movies/' + this.$route.params.id)
      this.$router.push({
        name: 'home'
      })
      console.log(response)
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 400){
  img {
  width: 250px;
  height: 350px;
  object-fit: cover;}
}

* {
  font-family: monospace, Avenir, Helvetica, Arial, sans-serif;
}

#details{
  color: white;
}

img {
  width: 320px;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
}

.tag{
color: white;
font-weight: bold;
font-size: 16px;
font-family: Arial, Helvetica, sans-serif;
padding: 3px 10px;
background-color: #ff6600;
border-radius: 5px;
}

a{
  text-decoration: none;
  color: #ffcc00;
}

a:hover{
  color: white;
}

</style>
