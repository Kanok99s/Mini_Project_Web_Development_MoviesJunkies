<template>
      <div class="main-view-container">
        <ul class="movies-list">
          <li
            class="movies-list__item" v-for="movie in movies" :key="movie.id" :title="movie.title">
            <img :src="movie.img" />
                <h2>{{ movie.name }}</h2>
                <h2>{{ movie.genre }}</h2>
                <h2>{{ movie.age_rating }}</h2>
                <h2>{{ movie.review_rating }}</h2>
                <h2>{{ movie.language }}</h2>
                <p>{{ movie.description }}</p>
            <button v-on:click="selectIdHandler(id), this.selectedIds.push(id)"> Add to favorites </button>
            <router-link :to="{ name: 'movie', params: { id: movie.id } }">
                  <div id="example-1">
</div>
            </router-link>
            <a class="add-to-favs" :class="{'YOUR-CSS-CLASS': selectedIds.includes(id)}" @click="addToFavs(movie.id)">Add to favorites</a>
          {{isFavorite}}
          </li>
        </ul>
      </div>
    </template>

<script>

export default {
  data() {
    return { selectedIds: [] }
  },

  methods: {
    addToFavs(movie) {
      if (!this.favoritesList.includes(movie)) {
        this.$store.dispatch('/watch_lists/', movie)
      }
    }
  },
  props: {
    movies: {
      type: Array,
      required: true
    }
  }
}

</script>

<style scoped>

</style>
