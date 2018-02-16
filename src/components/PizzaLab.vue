<template>
  <div class="pizzalab">
    <login-panel></login-panel>
    <h1>PizzaLab</h1>
    <div v-show="!showEditor">
    <ul>
      <li v-for="dough in doughList" v-on:click="editDough(dough)">
        <DoughCard v-bind:dough="dough" />
      </li>
    </ul>
    <button v-on:click="addDough">Add Dough</button>
  </div>
    <DoughEditor v-bind:dough="doughInEditor" v-show="showEditor" v-on:confirmed="doughEdited" v-on:cancelled="editCancelled"/>
  </div>
</template>

<script>
import DoughEditor from './DoughEditor'
import DoughCard from './DoughCard'
import LoginPanel from './LoginPanel'
import Dough from './dough.js'
import firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyD739TnqiRTSQcNsMaE4yj5SNeT7V9vLj4',
  authDomain: 'pizzalab2-e80ef.firebaseapp.com',
  databaseURL: 'https://pizzalab2-e80ef.firebaseio.com',
  projectId: 'pizzalab2-e80ef',
  storageBucket: 'pizzalab2-e80ef.appspot.com',
  messagingSenderId: '911004980652'
}
firebase.initializeApp(config)

export default {
  name: 'PizzaLab',
  components: {
    DoughEditor,
    DoughCard,
    LoginPanel
  },
  data: function () {
    return {
      adding: false,
      editing: false,
      draftDough: new Dough(),
      doughInEditor: new Dough(),
      doughList: [
        new Dough('Dough 1'),
        new Dough('Dough 2'),
        new Dough('Dough 3')
      ]
    }
  },
  computed: {
    showEditor: function () { return this.editing || this.adding }
  },
  methods: {
    addDough: function () {
      this.doughInEditor = this.draftDough
      this.adding = true
    },
    doughEdited: function () {
      if (this.adding) {
        this.doughList.push(this.doughInEditor)
        this.adding = false
      } else {
        this.editing = false
      }
    },
    editCancelled: function () {
      this.editing = false
      this.adding = false
    },
    editDough: function (dough) {
      this.doughInEditor = dough
      this.editing = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
