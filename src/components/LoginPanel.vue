<template>
  <div>
    <button v-if="!isLoggedIn" v-on:click="login">Login with Google</button>
    <span v-if="isLoggedIn">{{ user.displayName }}</span>
    <button v-if="isLoggedIn" v-on:click="logout">Logout</button>
  </div>
</template>
<script>

import firebase from 'firebase'

let provider = new firebase.auth.GoogleAuthProvider()

export default {
  name: 'login-panel',
  data: function () {
    return {
      user: null
    }
  },
  methods: {
    login: function () {
      let vm = this
      firebase.auth().signInWithPopup(provider).then(function (result) {
        vm.user = result.user
        vm.$emit('login', vm.user.uid)
      }).catch(function (error) {
        console.error(error)
        vm.user = null
      })
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
