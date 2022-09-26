<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/Signin">Signin</router-link>
    </div>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>
<script>
import { Signin } from '@/components/Signin.vue'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    signin: Signin
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
