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

</style>
