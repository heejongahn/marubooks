<template>
  <div :class="$style.card">
    <div v-text="book.title" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    book: { title: String }
  }
})
export default class Card extends Vue {
  book: { title: String }
}
</script>

<style module>
.card {
  max-width: 200px;
  padding: 12px;
  margin: 8px;

  border-radius: 4px;
  border: 1px solid grey;
}

.card:hover {
  background-color: grey;
  color: white;
}
</style>
