import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from './Index.vue'
import Donate from './Donate.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Index },
  { path: '/donate', component: Donate },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

new Vue({
  router,
  template: `
  <div id="app">
    <nav>
      <router-link to="/">
        <h1>마루 책방</h1>
      </router-link>
      <router-link to="/donate">
        <div>긔부하긔</div>
      </router-link>
    </nav>
    <router-view class="view"></router-view>
  </div>
  `
}).$mount('#app')
