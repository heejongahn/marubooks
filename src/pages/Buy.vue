<template>
  <div :class="$style.buy">
    <div :class="$style.buyHeader">
      <label :class="$style.filterLabel" :for="$style.filter"><div class="icon-search" /></label>
      <div :class="$style.filterDiv">
        <input
          :id="$style.filter"
          type="text"
          v-model="filter"
          placeholder="책 제목, 저자명, 출판사명으로 검색">
        <div v-if="filter !==''" class="icon-delete" :class="$style.resetButton" @click="filter=''" />
      </div>
    </div>
    <div :class="$style.cards">
      <card v-for="book in filteredBooks" key="book.title" :book="book" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { ComponentOptions } from 'vue'
import VueFire from 'vuefire'
import Component from 'vue-class-component'
import db from '../db'

import { Book } from '../interfaces'
import Card from '../components/Card.vue'

interface FirebaseComponentOption extends ComponentOptions<Vue> {
  firebase: Object
}

Vue.use(VueFire)

const componentOptions: FirebaseComponentOption = {
  name: 'index',
  firebase: {
    books: db.ref('books')
  },
  components: {
    card: Card
  }
}

@Component(componentOptions)
export default class Buy extends Vue {
  $firebaseRefs: any
  books: Array<Book>
  filter: string = ''
  loading: boolean = false

  get filteredBooks (): Array<Book> {
    return this.books.filter(book => {
      return (
        book.title.includes(this.filter) ||
        book.pub_nm.includes(this.filter) ||
        book.author.includes(this.filter)
      )
    })
  }
}
</script>
<style module>
.buy {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buy-header {
  width: 80%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.site-name {
  font-size: 4rem;
  font-weight: bold;
  letter-spacing: 1rem;
  margin-right: -1rem;
}

.search {
  width: 100%;
  position: relative;
}

.filter-label {
  margin-right: 24px;
}

.filter-div {
  flex-grow: 1;
  position: relative;
}

#filter {
  width: 100%;
  height: 50px;

  font-size: 20px;
  padding: 12px;
  border: 2px solid #ced3d6;
  border-radius: 2px;
  outline: none;
}

#filter:active,
#filter:focus {
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
