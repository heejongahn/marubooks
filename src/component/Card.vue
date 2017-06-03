<template>
  <div :class="$style.card">
    <img :src="book.cover_s_url" />
    <!--
    <div>{{ book.title }}</div>
    <div>{{ book.pub_nm }}</div>
    -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

interface Book {
  author: string,
  title: string,
  cover_s_url: string,
  cover_l_url: string,
  pub_nm: string,
  isbn13: string
}

@Component({
  props: [ "book" ]
})
export default class Card extends Vue {
  book: Book
}
</script>

<style module>
.card {
  flex: 1 1 0;
  padding: 12px;
  margin: 8px;

  border-radius: 4px;
  border: 1px solid #ced3d6;
}

.card:hover {
  background-color: #ced3d6;
  color: white;
}
</style>
