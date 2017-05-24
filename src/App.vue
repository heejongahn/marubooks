<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <input type="text" v-model="query" @blur="search">
    <ul>
      <li v-for="book in books" v-text="book.title"></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import jsonp from 'jsonp'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      books: [],
      query: ''
    }
  },
  methods: {
    search: function () {
      const BASE_URL = 'https://apis.daum.net/search/book'
      const API_KEY = "2d4d193c680ef190c4d1aeb514a433ef"
      const url = encodeURI(`${BASE_URL}?apikey=${API_KEY}&result=20&q="${this.query}"&sort=accu&searchType=title&output=json`)

      jsonp(url, null, (err, data) => {
        this.books = data.channel.item
      })
    }
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
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
