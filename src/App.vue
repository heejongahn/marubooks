<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <div>
        <ul>
          <li v-for="book in books">
            <span v-text="book.title" /><button @click="deleteBook(book)">삭제</button>
          </li>
        </ul>
      </div>
      <div>
        <label for="query">검색</label>
        <input id="query" type="text" v-model="query" @blur="search">
      </div>
      <div v-if="loading">로딩 중</div>
      <div v-else>
        <div>검색 결과 (클릭해서 추가)</div>
        <ul>
          <li @click="addBook(title)" v-for="title in resultBookTitles" v-text="title"></li>
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

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.database()

const booksRef = db.ref('books')

Vue.use(VueFire)

interface Book {
  title: string
}

interface FirebaseComponentOption extends ComponentOptions<Vue> {
  firebase: Object
}

const componentOptions: FirebaseComponentOption = {
  name: 'app',
  firebase: {
    books: booksRef
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

  addBook (title: string):void {
    this.$firebaseRefs.books.push({
      title
    })
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
</style>
