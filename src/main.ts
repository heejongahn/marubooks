import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: App },
  { path: '/donate', component: App },
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
