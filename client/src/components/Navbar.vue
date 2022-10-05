<template>
      <body>
      <div id="nav">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href=""> <a href="#" class="navbar-left"><img style="max-width:160px; margin-top: -20px; max-height: 150px;" src="../assets/cover.png"></a> </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" @click="toggleResponsive()"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarToggleDemo02">
  <ul class="navbar-nav ms-auto">
    <li class="nav-item">
      <a class="nav-link" href="/search"> Search </a>

    </li>
    <li class="nav-item">
      <a class="nav-link" href="/home"> Home </a>

    </li>
    <li class="nav-item">
      <a class="nav-link" href="/movies"> Movies </a>

    </li>
    <li class="nav-item">
      <a class="nav-link" href="/watch_lists"> Watchlists </a>

    </li>
    <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             Account
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">View profile</a></li>
              <li><a class="dropdown-item" href="#">Settings</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Log out</a></li>
            </ul>
          </li>
  </ul>
  </div>
  </nav>

      </div>
      <!-- Render the content of the current page view -->
      <router-view/>
    </body>
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
.nav {
font-size: 1rem !important;
font-weight: bold;
}
</style>
