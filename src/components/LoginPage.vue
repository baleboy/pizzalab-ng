<template>
  <div class="content">
    <h1>Sign in</h1>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>

import firebase from 'firebase'
import firebaseui from 'firebaseui'

export default {

  name: 'login-page',

  mounted: function () {
    let uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    }

    let ui = new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-auth-container', uiConfig)
  },

  methods: {
    save: function () {
      this.$emit('save')
    },
    deleteDough: function () {
      this.$emit('delete')
    },
    cancel: function () {
      this.$emit('cancel')
    }
  }
}
</script>

<style>
  @import 'firebaseui/dist/firebaseui.css';
</style>
