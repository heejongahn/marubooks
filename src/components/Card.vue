<template>
  <div :class="$style.card">
    <img :class="$style.bookCover" :src="book.cover_s_url" />
    <div :class="$style.bookMeta">
      <div :class="$style.title">
        {{ book.title }}
      </div>
      <div :class="$style.publisher">
        {{ book.author }}
      </div>
      <div :class="$style.deleteButton" class="icon-trash" />
    </div>
    <!--
    <div>{{ book.title }}</div>
    <div>{{ book.pub_nm }}</div>
    -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Book } from '../interfaces'

@Component({
  props: [ "book" ]
})
export default class Card extends Vue {
  book: Book
}
</script>

<style module>
.card {
  display: flex;

  flex: 0 1 0;
  padding: 12px;
  margin: 8px;

  border-radius: 12px;

  background: #FFFFFF;
  min-width: 320px;
}

.card:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: white;
}

.book-cover {
  height: 100%;
  margin-right: 24px;
}

.book-meta {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.title {
  word-break: keep-all;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
}

.publisher {
  font-size: 12px;
  color: rgb(12, 12, 12);
}
</style>
