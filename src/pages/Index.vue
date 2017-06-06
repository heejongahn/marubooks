<template>
  <h1>안뇽</h1>
</template>

<script lang="ts">
import Vue, { ComponentOptions } from 'vue'
import Component from 'vue-class-component'

const componentOptions: ComponentOptions<Vue> = {
  name: 'index'
}

@Component(componentOptions)
export default class Index extends Vue {
}
</script>

<style module>
</style>
