<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <input type="text" v-model="query" @blur="search">
      <span v-if="loading">로딩 중</span>
      <ul v-else>
        <li v-for="book in books" v-text="book.title"></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import jsonp from 'jsonp'

@Component({
  name: 'app'
})
export default class App extends Vue {
  books: Array<object> = []
  query: string = ''
  loading: boolean = false
  search ():void {
    const _jsonp: Function = jsonp
    const BASE_URL = 'https://apis.daum.net/search/book'
    const API_KEY = "2d4d193c680ef190c4d1aeb514a433ef"
    const url = encodeURI(`${BASE_URL}?apikey=${API_KEY}&result=20&q="${this.query}"&sort=accu&searchType=title&output=json`)

    this.loading = true
    _jsonp(url, null, (_: never, data: { channel: { item: Array<Object> } }) => {
      this.books = data.channel.item
    })
    this.loading = false
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
