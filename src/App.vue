<template>
  <div class="app">
    <nav>
      <router-link class="router-link" to="/">
        마루 책방
      </router-link>
      <div>
        <router-link class="router-link" to="/buy">
          사기
        </router-link>
        <router-link class="router-link" to="/sell">
          팔기
        </router-link>
      </div>
    </nav>
    <router-view class="view"></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from './pages/Index.vue'
import Buy from './pages/Buy.vue'
import Sell from './pages/Sell.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Index },
  { path: '/buy', component: Buy },
  { path: '/sell', component: Sell },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default ({
  router
})
</script>

<style>
@import url("../node_modules/normalize.css/normalize.css");

* { font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif'; }

* {
  box-sizing: border-box;
}

body {
  display: flex;
  justify-content: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

body, a, div, span, p, li, h1, h2, h3, h4, h5, h6 {
  color: #2c3e50;
}

.app {
  margin-top: 60px;
  width: 80%;
  max-width: 800px;
}

@media (max-width: 480px) {
  .app {
    padding: 24px;
    width: 100%;
  }
}

h1 {
  font-size: 4rem;
}

h2 {
  font-size: 3rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  text-decoration: none;
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.router-link {
  font-size: 1.5rem;
  margin-right: 24px;
  transition: color 0.3s ease;
}

.router-link:hover,
.router-link-exact-active {
  color: #2f9e44;
}
</style>
