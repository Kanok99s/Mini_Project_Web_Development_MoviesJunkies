<template>
<div>
<Lists>
   </Lists>
   <Movies />
</div>
</template>

<script>

import Lists from '../components/UserWatchlist.vue'
import Movies from '../components/MovieItem.vue'
import { Api } from '@/Api'

export default {
  components: { Lists, Movies },
  name: 'Watch_lists',
  mounted() {
    console.log('Page is loaded')
  },
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    deleteList(id) {
      Api.delete('/watch_lists' + this.$route.params.id).then(response => {
        const index = this.watch_lists.findIndex(list => list._id === id)
        this.watch_lists.splice(index, 1)
      })
    },
    getWatchLists() {
      Api.get('/watch_lists').then(Response => {
        this.watch_lists = Response.data.watch_lists
      }).catch(error => {
        this.watch_lists = error
        console.log(error)
      })
    }
  }
}

</script>

<style scoped>
h1{
    color: black;
}
</style>
