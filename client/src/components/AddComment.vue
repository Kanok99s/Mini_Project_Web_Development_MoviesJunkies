<template>
    <form class="comment-form" @submit.prevent="onSubmit">
    <h3>Leave a comment</h3>
    <label for="title">Title :</label>
    <input id="title" v-model="title">

    <label for="comment">comment :</label>
    <textarea id="comment" v-model="comment"></textarea>
    <br>
    <button class="button" type="submit">Submit</button>

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
  width: 70%;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  color: black;
  border: 2px solid #eec3c0;
  background-color: #eec3c0;
  }

 button{
  border-radius: 12px;
  background-color: #e7e7e7;
  color: black;
  width: fit-content;
 }
label{
  padding: 1%;
}

input{
  width: 80%;
}

h3{
     font-weight: 700;
     color: black;
     font-size: 20px;
}
</style>
