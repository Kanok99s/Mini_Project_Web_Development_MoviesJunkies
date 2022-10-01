<template>
      <div class="main-view-container">
        <h1>{{categoryName | formattedText}}</h1>
        <ul class="movies-list">
          <li
            class="movies-list__item" v-for="movie in movies" :key="movie.id" :title="movie.title">
            <button v-on:click="selectIdHandler(id), this.selectedIds.push(id)"> Add to favorites </button>
            <router-link :to="{ name: 'movie', params: { id: movie.id } }">
                  <div id="example-1">
</div>
            </router-link>
            <a class="add-to-favs" :class="{'YOUR-CSS-CLASS': selectedIds.includes(id)}" @click="addToFavs(movie)">Add to favorites</a>
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
        this.$store.dispatch('addToFavs', movie)
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
