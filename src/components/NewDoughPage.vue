<template>
  <dough-editor v-bind:dough="draftDough" @close="closePage" @save="saveDough"></dough-editor>
</template>

<script>
import firebase from 'firebase'
import Dough from './dough'
import DoughEditor from './DoughEditor'

export default {
  name: 'newdough-page',

  components: {
    DoughEditor
  },

  data () {
    return {
      draftDough: new Dough()
    }
  },

  methods: {
    closePage: function () {
      let defaultDough = new Dough()
      if (this.draftDough.isEqual(defaultDough)) {
        this.$router.replace('/')
      } else {
        this.$dialog.confirm('Discard edits?').then(() => {
          this.$router.replace('/')
        })
      }
    },
    saveDough: function () {
      let ts = Date.now()
      let doughListRef = firebase.database().ref('users/' + this.userId + '/doughs')
      let newDoughRef = doughListRef.push()
      this.draftDough.timeCreated = ts
      newDoughRef.set(this.draftDough)
      this.$router.replace('/')
    }
  },

  props: [ 'userId' ]

}
</script>
