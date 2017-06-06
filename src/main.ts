import Vue from 'vue'
import App from './App.vue'

const options = Object.assign({},
  App,
  { el: '#root'}
)

new Vue(options)
