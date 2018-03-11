<template>
  <div>
    <dough-editor v-bind:dough="draftDough" @close="closePage" @save="saveDough"></dough-editor>
  </div>
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
      draftDough: new Dough(),
    }
  },

  methods: {
    closePage: function () {
      this.$router.replace('/')
    },
    saveDough: function () {
      let ts = Date.now()
      let doughListRef = firebase.database().ref('users/' + this.userId + '/doughs')
      let newDoughRef = doughListRef.push()
      this.draftDough.timeCreated = ts
      newDoughRef.set(this.draftDough)
      this.closePage()
    },
  },

  props: [ 'userId' ]

}
</script>
