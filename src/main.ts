import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from './Index.vue'
import Buy from './Buy.vue'
import Sell from './Sell.vue'

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

new Vue({
  router,
  el: '#app',
  template: `
  <div id="app">
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
  `
}).$mount('#app')
