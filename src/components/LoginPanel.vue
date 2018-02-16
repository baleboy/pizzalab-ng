<template>
  <div>
    <button v-if="!isLoggedIn" v-on:click="login">Login with Google</button>
    <span v-if="isLoggedIn">{{ user.displayName }}</span>
    <button v-if="isLoggedIn" v-on:click="logout">Logout</button>
  </div>
</template>
<script>

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
      }).catch(function (error) {
        console.error(error)
        vm.user = null
      })
    },
    logout: function () {
      let vm = this
      firebase.auth().signOut().then(function () {
        vm.user = null
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
