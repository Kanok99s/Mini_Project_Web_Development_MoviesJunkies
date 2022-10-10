<template>
  <div id="app">
<Navbar />

    <router-view> </router-view>
  </div>
</template>

<script>
import { Signin } from '@/components/Signin.vue'
import Navbar from './components/Navbar.vue'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    signin: Signin,
    Navbar
  }
}

</script>

<style>
#app {
  font-family:  monospace,'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #321e23;
  background-color: #3c415e;

}
</style>
