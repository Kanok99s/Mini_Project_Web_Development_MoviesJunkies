<template>
      <div>
      <img src="../assets/video.png" alt="Movie" class="mr-3 mt-3" style="width:150px;">
      <div class="media-body">
            <h4> {{ movie.name }} <small></small></h4>
            <h4> {{ movie.genre }} <small></small></h4>
            <h4> {{ movie.age_rating }} <small></small></h4>
            <h4> {{ movie.language }} <small></small></h4>
      </div>
      </div>
</template>

<script>
export default {
  name: 'movie-item',
  props: ['movie']
}
</script>
