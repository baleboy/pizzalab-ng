<template>
  <div>
    <div class="header">
      <div class="vertical-centered">
        <div class="title">
          PizzaLab
        </div>
      </div>
      <div class="vertical-centered">
        <login-panel v-on:login="userLogged" v-on:logout="removeUser"></login-panel>
      </div>
    </div>
    <div v-show="showList">
    <ul>
      <li v-for="item in doughList" v-on:click="openRecipe(item)">
        <dough-card v-bind:dough="item.dough"></dough-card>
      </li>
    </ul>
    <button v-on:click="addDough">Add Dough</button>
  </div>
    <dough-editor v-bind:dough="doughInEditor.dough" v-show="showEditor" v-on:save="doughEdited" v-on:cancel="editCancelled" v-on:delete="deleteDough"></dough-editor>
    <recipe-page v-bind:dough="doughInEditor.dough" v-show="showRecipe" @close="showRecipe = false" @edit="editDough"></recipe-page>
  </div>
</template>

<script>
import DoughEditor from './DoughEditor'
import DoughCard from './DoughCard'
import LoginPanel from './LoginPanel'
import RecipePage from './RecipePage'
import Dough from './dough.js'
import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyD739TnqiRTSQcNsMaE4yj5SNeT7V9vLj4',
  authDomain: 'pizzalab2-e80ef.firebaseapp.com',
  databaseURL: 'https://pizzalab2-e80ef.firebaseio.com',
  projectId: 'pizzalab2-e80ef',
  storageBucket: 'pizzalab2-e80ef.appspot.com',
  messagingSenderId: '911004980652'
}
firebase.initializeApp(config)

export default {
  name: 'pizza-lab',
  components: {
    DoughEditor,
    DoughCard,
    LoginPanel,
    RecipePage
  },
  data: function () {
    return {
      adding: false,
      editing: false,
      showRecipe: false,
      draftDough: new Dough(),
      doughInEditor: { key: null, dough: new Dough() },
      doughList: [],
      userId: null
    }
  },
  computed: {
    showEditor: function () { return this.editing || this.adding },
    showList: function () { return !this.showEditor && !this.showRecipe }
  },
  methods: {
    addDough: function () {
      this.doughInEditor.dough = this.draftDough
      this.adding = true
    },
    doughEdited: function () {
      if (this.userId) {
        let doughListRef = firebase.database().ref('users/' + this.userId + '/doughs')
        if (this.adding) {
          let newDoughRef = doughListRef.push()
          newDoughRef.set(this.doughInEditor.dough)
          this.adding = false
        } else {
          doughListRef.child(this.doughInEditor.key).set(this.doughInEditor.dough)
          this.editing = false
          this.showRecipe = true
        }
      } else {
        console.log('Cannot save dough to DB. No user.')
      }
    },
    editCancelled: function () {
      let wasEditing = this.editing
      this.editing = false
      this.adding = false
      if (wasEditing) {
        this.showRecipe = true
      }
    },
    editDough: function () {
      this.showRecipe = false
      this.editing = true
    },
    openRecipe: function (item) {
      this.doughInEditor = item
      this.showRecipe = true
    },
    deleteDough: function () {
      let key = this.doughInEditor.key
      let doughRef = firebase.database().ref('users/' + this.userId + '/doughs/' + key)
      doughRef.remove()
      this.doughList = this.doughList.filter(e => e.key !== key)
      this.editing = false
    },
    userLogged: function (uid) {
      console.log('logged in user: ' + uid)
      this.userId = uid
      // retrieve dough list
      let doughsRef = firebase.database().ref('users/' + this.userId + '/doughs')
      let vm = this
      doughsRef.on('child_added', function (data) {
        let dough = new Dough()
        dough.fromJSON(data.val())
        let doughItem = { key: data.key, dough: dough }
        vm.doughList.push(doughItem)
      })
    },
    removeUser: function () {
      this.doughList = []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lobster');

.header {
  display: table;
  width: 100%;
  background-color: #0077ff;
  color: white;
  padding: 1em;
  padding-left: 2em; }

.vertical-centered {
  display: table-cell;
  vertical-align: middle;
  height: 100px; }

.title {
  font-size: 3em;
  float: left;
  font-family: 'Lobster', cursive; }

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
