<template>
  <div>
    <span v-if="isLoggedIn" class="username">{{ user.displayName }}</span>
    <button v-if="isLoggedIn" v-on:click="logout">Logout</button>
  </div>
</template>
<script>

import firebase from 'firebase'

const provider = new firebase.auth.GoogleAuthProvider()

export default {
  name: 'login-panel',
  data: function () {
    return {
      user: null
    }
  },
  mounted: function () {
    firebase.auth().onAuthStateChanged(function (authData) {
      if (authData) {
        this.user = authData
      }
    }.bind(this))
  },
  methods: {
    login: function () {
      firebase.auth().signInWithPopup(provider)
    },
    logout: function () {
      let vm = this
      firebase.auth().signOut().then(function () {
        vm.user = null
        vm.$emit('logout')
      }).catch(function (error) {
        console.error(error)
      })
    }
  },
  computed: {
    isLoggedIn: function () {
      return (this.user !== null)
    }
  }
}
</script>

<style>
@media (max-width: 450px) {
  .username {
    display: none;
  }
}
</style>