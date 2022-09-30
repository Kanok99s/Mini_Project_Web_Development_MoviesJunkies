<template>
  <div id="app">

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
  color: #321e23;

}
</style>
