<template>
  <div :class="$style.app">
    <h1 :class="$style.siteName">마루책방</h1>
    <div :class="$style.search">
      <div :class="$style.queryDiv">
        <input :id="$style.query" type="text" v-model="query" @input="search">
        <div v-if="resultExists" :class="$style.resetButton" @click="searchResult = []">X</div>
      </div>
      <div v-if="resultExists" :class="$style.searchResultList">
        <div v-for="book in searchResult" :key="book.key" @click="addBook(book)" :class="$style.searchResult">
          <img :src="book.cover_s_url" :class="$style.bookCover"/>
          <div :class="$style.titleAndPublisher">
            <div v-text="book.title" />
            <div v-text="book.pub_nm" />
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.cards">
      <card v-for="book in books" key="book.title" :book="book" />
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
  books: Array<Book>
  searchResult: Array<Book> = []
  query: string = ''
  loading: boolean = false

  get resultExists (): boolean {
    return this.searchResult.length > 0
  }

  search ():void {
    const _jsonp: Function = jsonp
    const BASE_URL = 'https://apis.daum.net/search/book'
    const API_KEY = "2d4d193c680ef190c4d1aeb514a433ef"
    const url = encodeURI(`${BASE_URL}?apikey=${API_KEY}&result=10&q="${this.query}"&sort=accu&searchType=title&output=json`)

    this.loading = true

    _jsonp(url, null, (_: never, data: { channel: { item: Array<Book> } }) => {
      this.searchResult = data.channel.item.map(book => ({
        ...book,
        title: book.title.replace(/&amp;/g, '&'),
        pub_nm: book.pub_nm.replace(/&amp;/g, '&')
      }))
      this.loading = false
    })
  }

  addBook (book: Book):void {
    if (!this.books.map(book => book.title).includes(book.title)) {
      this.$firebaseRefs.books.push(book)
    }
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
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.site-name {
  font-size: 4rem;
  font-weight: bold;
  letter-spacing: 1rem;
  margin-right: -1rem;
}

.search,
.cards {
  width: 60%;
  max-width: 800px;
}

.search {
  position: relative;
}

.query-div {
  position: relative;
}

#query {
  width: 100%;
  height: 50px;

  font-size: 20px;
  padding: 12px;
  border: 2px solid #ced3d6;
  border-radius: 2px;
  outline: none;
}

#query:active,
#query:focus {
  border: 2px solid #87b1f3;
  outline: none;
}

.reset-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
  color: #ced3d6;
  font-weight: bold;
}

.search-result-list {
  position: absolute;
  background-color: white;
  width: 100%;

  border: 2px solid #ced3d6;
  border-top: none;
  border-radius: 2px;
}

.search-result {
  display: flex;
  padding: 12px;
  align-items: center;
}

.search-result:hover {
  background-color: #87b1f3;
}

.book-cover {
  flex-shrink: 0;
  max-height: 40px;
  margin-right: 12px;
}

.title-and-publisher {
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
