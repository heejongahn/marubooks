<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <div :class="$style.cards">
        <card v-for="book in books" key="book.title" :book="book" />
      </div>
      <div>
        <label for="query">검색</label>
        <input id="query" type="text" v-model="query" @blur="search">
      </div>
      <div v-if="loading">로딩 중</div>
      <div v-else>
        <div>검색 결과 (클릭해서 추가)</div>
        <ul>
          <li @click="addBook(book)" v-for="book in searchResult" key="title" v-text="book.title"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/// <reference path="../typings.d.ts" />
import Vue, { ComponentOptions } from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase'
import Component from 'vue-class-component'
import jsonp from 'jsonp'

import firebaseConfig from '../firebase.json'

import Card from './component/Card.vue'

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.database()

const booksRef = db.ref('books')

Vue.use(VueFire)

interface Book {
  author: string,
  title: string,
  cover_s_url: string,
  cover_l_url: string,
  pub_nm: string,
  isbn13: string
}

interface FirebaseComponentOption extends ComponentOptions<Vue> {
  firebase: Object
}

const componentOptions: FirebaseComponentOption = {
  name: 'app',
  firebase: {
    books: booksRef
  },
  components: {
    card: Card
  }
}

@Component(componentOptions)
export default class App extends Vue {
  $firebaseRefs: any
  searchResult: Array<Book> = []
  query: string = ''
  loading: boolean = false

  get resultBookTitles (): Array<string> {
    return this.searchResult.map(book => book.title)
  }

  search ():void {
    const _jsonp: Function = jsonp
    const BASE_URL = 'https://apis.daum.net/search/book'
    const API_KEY = "2d4d193c680ef190c4d1aeb514a433ef"
    const url = encodeURI(`${BASE_URL}?apikey=${API_KEY}&result=20&q="${this.query}"&sort=accu&searchType=title&output=json`)

    this.loading = true

    _jsonp(url, null, (_: never, data: { channel: { item: Array<Book> } }) => {
      this.searchResult = data.channel.item
      this.loading = false
    })
  }

  addBook (book: Book):void {
    this.$firebaseRefs.books.push(book)
  }

  deleteBook (book: {key: string}): void {
   this.$firebaseRefs.books.child(book['.key']).remove()
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

* {
  box-sizing: border-box;
}
</style>

<style module>
.cards {
  display: flex;
  flex-wrap: wrap;
}
</style>
