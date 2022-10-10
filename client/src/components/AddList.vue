<template>
    <div class="w-350 p-4 d-flex align-items-center justify-content-center">
    <b-form class="list-form" @submit.prevent="onSubmit()">
    <h3>Add a new watchlist</h3>
    <label for="title">Title :</label>
    <b-form-input class="input-title" id="title" v-model="title"> </b-form-input>

    <br>
    <input class="button" type="submit" value="Submit">

  </b-form>
</div>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'add-list',
  data() {
    return {
      title: '',
      watch_lists: {}
    }
  },
  methods: {
    onSubmit() {
      if (this.title === '') {
        alert('Please add a title.')
        return
      }

      const list = {
        title: this.title
      }
      const result = Api.post('/watch_lists', {
        title: this.title
      })
      if (result.status === 201) {
        console.log('List is added')
      }
      this.$emit('list-submitted', list)

      this.title = ''
    }
  }
}
</script>

<style scoped>

@media screen and (min-width: 800px) {
.list-form {
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  border: 4px solid #eec3c0;
  margin: 2em;

}
}
@media screen and (min-width: 480px) and (max-width: 800px) {
   .list-form{
        width: 100%;
        border: 2px solid #eec3c0;
        border-radius: 20px;
        margin-left: auto;
        margin-right: auto;
        padding: 10px;
    }
}

.button {
background-color: #998998;
font-size: medium;
color: white;
font-size: 20px;
margin: 1em;
padding: 10px 20px;
border-radius: 12px;
transition-duration: 0.4s;
}
.button:hover {
background-color: #998998;
color: white;
font-size: 22px;
}
.input-title {
    border: 1px solid #eec3c0;
}
</style>
