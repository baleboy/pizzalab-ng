<template>
  <div>
    <div class="content">
      <div v-if="!loading" class="item-wrapper">
        <div class="item" v-on:click="addDough">
          <card>
            <p class="huge">+</p>
            <p>Add new dough</p>
          </card>
        </div>
        <div class="item" v-for="item in doughList" v-on:click="openRecipe(item)">
          <dough-card v-bind:dough="item.dough"></dough-card>
        </div>
      </div>
    </div>
    <div v-if="loading">
      <p class="loading-indicator">Loading...</p>
    </div>
  </div>
</template>

<script>
import Card from './Card'
import DoughCard from './DoughCard'
import Dough from './dough.js'
import firebase from 'firebase'

export default {
  name: 'recipe-list',
  components: {
    Card,
    DoughCard
  },
  data: function () {
    return {
      doughList: [],
      userId: null,
      loading: true
    }
  },
  mounted: function () {
    firebase.auth().onAuthStateChanged((authData) => {
      if (authData) {
        this.userLogged(authData.uid)
      } else {
        this.removeUser()
      }
    })
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
      doughsRef.on('child_added', (data) => {
        let dough = new Dough()
        dough.copy(data.val())
        let doughItem = { key: data.key, dough: dough }
        this.doughList.push(doughItem)
        this.doughList.sort(function (d1, d2) {
          return (d2.dough.timeCreated - d1.dough.timeCreated)
        })
        this.loading = false
      })
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

.huge {
  font-size: 3em; }

.loading-indicator {
  font-size: 2em;
  color: #999999;
}

</style>
