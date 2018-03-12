<template>
  <div id="app">
    <div class="header">
      <div class="vertical-centered">
        <div class="title">
          PizzaLab
        </div>
      </div>
      <div class="vertical-centered">
        <login-panel class="align-right"></login-panel>
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import LoginPanel from './components/LoginPanel'
export default {
  name: 'App',
  components: {
    LoginPanel
  }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lobster');

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

button {
  font-size: 0.8em;
  padding: 10px;
  border: 0;
  box-shadow: none;
  border-radius: 2px;
  background-color: #00AAFF;
  color: white; }

button:disabled {
  background-color: lightGray;
  color: darkGray; }

button:hover:enabled {
  background-color: #00BBFF; }

button:active:enabled {
  background-color: #00CCFF; }

.header {
  display: table;
  width: 100%;
  background-color: #0077ff;
  color: white;
  padding: 0.4em;
  padding-left: 2em;
  padding-right: 2em;
 }

.vertical-centered {
  display: table-cell;
  vertical-align: middle;
  height: 100px; }

.title {
  font-size: 3em;
  float: left;
  font-family: 'Lobster', cursive; }

.align-right {
  float: right; }

.content {
  margin-top: 2em;
}

.toolbar {
  width: 100%;
  background-color: #0066ee;
  padding-left: 2em;
  padding-right: 2em;
  padding-top: 3px;
  padding-bottom: 3px;
  overflow: auto;}

.toolbutton {
  float: left;
}

.closebutton {
  float: right;
}

</style>
