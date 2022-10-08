<template>
    <form class="comment-form" @submit.prevent="onSubmit">
    <h3>Leave a comment</h3>
    <label for="title">Title :</label>
    <input id="title" v-model="title">

    <label for="comment">comment :</label>
    <textarea id="comment" v-model="comment"></textarea>
    <br>
    <input class="button" type="submit" value="Submit">

  </form>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'add-comment',
  data() {
    return {
      title: '',
      comment: ''
    }
  },
  methods: {
    onSubmit() {
      if (this.title === '' || this.comment === '') {
        alert('Comment is incomplete. Please fill out every field.')
        return
      }

      const comment = {
        title: this.title,
        comment: this.comment
      }
      const result = Api.post('/movies/' + this.$route.params.id + '/comments', {
        title: this.title,
        comment: this.comment
      })
      if (result.status === 201) {
        console.log('comment is added')
      }
      this.$emit('comment-submitted', comment)

      this.title = ''
      this.comment = ''
    }
  }
}
</script>

<style scoped>
  .comment-form {
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid #d8d8d8;
  background-color: white;
  -webkit-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  box-shadow: 2px 15px -12px rgba(0, 0, 0, 0.57);
}

label{
  padding: 1%;
}

h3{
     font-weight: 700;
     color: #6d7394;
}
</style>
