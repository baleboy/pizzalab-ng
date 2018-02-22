<template>
  <div>
    <login-panel v-on:login="userLogged" v-on:logout="removeUser"></login-panel>
    <h1>PizzaLab</h1>
    <div v-show="!showEditor">
    <ul>
      <li v-for="item in doughList" v-on:click="editDough(item)">
        <dough-card v-bind:dough="item.dough"></dough-card>
      </li>
    </ul>
    <button v-on:click="addDough">Add Dough</button>
  </div>
    <dough-editor v-bind:dough="doughInEditor.dough" v-show="showEditor" v-on:save="doughEdited" v-on:cancel="editCancelled" v-on:delete="deleteDough"></dough-editor>
  </div>
</template>

<script>
import DoughEditor from './DoughEditor'
import DoughCard from './DoughCard'
import LoginPanel from './LoginPanel'
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
    LoginPanel
  },
  data: function () {
    return {
      adding: false,
      editing: false,
      draftDough: new Dough(),
      doughInEditor: { key: null, dough: new Dough() },
      doughList: [],
      userId: null
    }
  },
  computed: {
    showEditor: function () { return this.editing || this.adding }
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
        }
      } else {
        console.log('Cannot save dough to DB. No user.')
      }
    },
    editCancelled: function () {
      this.editing = false
      this.adding = false
    },
    editDough: function (item) {
      this.doughInEditor = item
      this.editing = true
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
