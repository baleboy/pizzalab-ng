<template>
  <div>
    <div class="toolbar">
      <button class="toolbutton" v-on:click="addDough">New Dough</button>
    </div>
    <div class="content">
      <div class="item-wrapper">
        <div class="item" v-for="item in doughList" v-on:click="openRecipe(item)">
          <dough-card v-bind:dough="item.dough"></dough-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DoughCard from './DoughCard'
import Dough from './dough.js'
import firebase from 'firebase'

export default {
  name: 'recipe-list',
  components: {
    DoughCard
  },
  data: function () {
    return {
      doughList: [],
      userId: null
    }
  },
  mounted: function () {
    firebase.auth().onAuthStateChanged(function (authData) {
      if (authData) {
        this.userLogged(authData.uid)
      } else {
        this.removeUser()
      }
    }.bind(this))
  },
  methods: {
    addDough: function () {
      this.$router.push({ path: `/${this.userId}/add` })
    },
    openRecipe: function (item) {
      this.$router.push({ path: `/${this.userId}/doughs/${item.key}` })
    },
    userLogged: function (uid) {
      console.log('logged in user: ' + uid)
      this.userId = uid
      // retrieve dough list
      let doughsRef = firebase.database().ref('users/' + this.userId + '/doughs')
      doughsRef.on('child_added', function (data) {
        let dough = new Dough()
        dough.copy(data.val())
        let doughItem = { key: data.key, dough: dough }
        this.doughList.push(doughItem)
        this.doughList.sort(function (d1, d2) {
          return (d2.dough.timeCreated - d1.dough.timeCreated)
        })
      }.bind(this))
    },
    removeUser: function () {
      this.doughList = []
    }
  }
}
</script>

<style scoped>

.item-wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
  margin: auto;
  margin-bottom: 2em;
  margin-left: 4em;
  justify-content: flex-start; }

.item {
  margin: 1em; }

</style>
