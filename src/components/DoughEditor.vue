<template>
  <div>
    <p>Name: <input type="text" v-model="dough.doughName"></p>
    <p>Pizzas: <input type="number" v-model.number="dough.pizzas"></p>
    <p>Hydration: <input type="number" v-model.number="dough.hydration">%</p>
    <p>Yeast: <input type="number" step="0.1" v-model.number="dough.yeastPrc">%</p>
    <p>Salt:  <input type="number" step="0.1" v-model.number="dough.saltPrc">%</p>
    <p>Starter: <input type="number" step="any" v-model.number="dough.prefermentPrc">%</p>
    <div v-if="dough.prefermentPrc > 0">
      <p>Starter hydration: <input type="number" step="any" v-model.number.lazy="dough.prefermentHydration">%</p>
      <p>Starter yeast: <input type="number" step="any" v-model.number.lazy="dough.prefermentYeastPrc">%</p>
    </div>
    <h2>Instructions:</h2>
    <textarea v-model="dough.steps" placeholder="Enter steps here"></textarea>
    <p>Flour: {{dough.flour()}}</p>
    <p>Water: {{dough.water()}}</p>
    <p>Salt: {{dough.salt()}}</p>
    <p>Yeast: {{dough.yeast()}}</p>
    <button v-on:click="save">Save</button>
    <button v-if="doughId" v-on:click="deleteDough">Delete</button>
    <button v-on:click="close">Close</button>
  </div>
</template>

<script>

import Dough from './dough'
import firebase from 'firebase'

export default {
  name: 'dough-editor',

  data () {
    return {
      dough: new Dough()
    }
  },

  created () {
    this.getDough()
  },

  watch: {
    '$route': 'getDough'
  },

  methods: {
    save: function () {
      let ts = Date.now()
      if (this.doughId) {
        this.getDoughRef().set(this.dough)
      } else {
        let doughListRef = firebase.database().ref('users/' + this.userId + '/doughs')
        let newDoughRef = doughListRef.push()
        this.dough.timeCreated = ts
        newDoughRef.set(this.dough)
      }
      this.$router.replace('/')
    },
    deleteDough: function () {
      this.getDoughRef().remove()
      this.$router.replace('/')
    },
    close: function () {
      this.$router.go('-1')
    },
    getDough: function () {
      if (this.doughId) {
        this.getDoughRef().once('value').then(function (snapshot) {
          if (snapshot.val()) {
            this.dough.copy(snapshot.val())
          } else {
            console.log('Error retrieving dough')
          }
        }.bind(this))
      }
    },
    getDoughRef: function () {
      let uid = this.$route.params.userId
      let did = this.$route.params.doughId
      return firebase.database().ref('users/' + uid + '/doughs/' + did)
    }
  },

  props: [ 'userId', 'doughId' ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="text"],
input[type="number"]
{
    font-size:1em;
    font-family: 'Open Sans', sans-serif;
}

input[type="text"] {
  width: 300px;
}

input[type="number"] {
  width: 30px;
}

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

textarea {
  outline: none;
  resize: none;
  font-size: 1em;
  width: 450px;
  height: 300px;
}

@media (max-width: 660px) {
  textarea {
    width: 300px;
  }
}
</style>
