<template>
  <div id="app">
    <PizzaLab/>
  </div>
</template>

<script>
import PizzaLab from './components/PizzaLab'

export default {
  name: 'App',
  components: {
    PizzaLab
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
}

* {
  box-sizing: border-box; }

[v-cloak] {
  display: none; }

html, body {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  font-family: 'Open Sans', sans-serif;
  color: #444;
  background-color: white;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-overflow-scrolling: touch; }

input {
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 1px solid lightGray; }

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0; }

</style>
