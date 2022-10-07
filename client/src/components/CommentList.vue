<template>
      <div class="review-container">
  <h3>Comment Section:</h3>
  <br/>
    <ul>
      <li v-for="(comment, index) in comments" :key="index">
        <h5>{{ comment.title }}</h5>
        "{{ comment.comment }}"
        <hr/>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'comment-list',
  props: {
    comments: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.review-container {
  width: 50%;
  padding: 30px;
  background-color: white;
  -webkit-box-shadow: 0px 2px 20px -12px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 2px 20px -12px rgba(0, 0, 0, 0.57);
  box-shadow: 2px 20px -12px rgba(0, 0, 0, 0.57);
  margin-left: auto;
  margin-right: auto;
  border: 2px solid #d8d8d8;
}

h5{
      font-weight: 600;
      margin-right: 20px;
}

h3{
      font-weight: 700;
      color: #c45c4c;
}
</style>
