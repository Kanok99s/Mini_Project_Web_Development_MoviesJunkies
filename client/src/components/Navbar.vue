<template>
  <div>

  <b-navbar toggleable="md" type="dark" class="navbar navbar-light" style="background-color:#7b8aaa">
    <b-navbar-brand href="/home" class="navbar-left"><img style="max-width:160px; margin-top: -20px; max-height: 150px;" src="../assets/cover.png"></b-navbar-brand>

    <b-navbar-nav class="ms-auto" style="float: right">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="navbar-right">
        <b-nav-item href="/home">Home</b-nav-item>
        <b-nav-item href="/watch_lists">Watchlists</b-nav-item>
        <b-nav-item href="/add_movie">Add movie</b-nav-item>
      </b-navbar-nav>

        <b-nav-item-dropdown text="User Settings" right>
          <b-dropdown-item href="/manageusers">Manage users </b-dropdown-item>
          <b-dropdown-item href="/">Logout </b-dropdown-item>
        </b-nav-item-dropdown>

    </b-collapse>
  </b-navbar-nav>
  </b-navbar>
</div>
</template>

<script>
export default {
  data() {
    return {
      sticky: false,
      enableStickyOn: 100,
      latestRoute: '',
      mobileNavigation: false
    }
  },
  mounted() {
    this.latestRoute = this.$route.name
  },
  methods: {
    toggleResponsive() {
      this.show = !this.show
    }
  }
}
</script>

<style scoped>
* {
  font-family:  monospace,'Avenir', Helvetica, Arial, sans-serif;
}

.navbar-right {
font-size: 18px;
font-weight: bold;
}

a:hover{
    color:white;
    text-decoration: underline;
    border-radius: 15px;
}
a:active{
    color:white;
    text-decoration: underline;
}

</style>
