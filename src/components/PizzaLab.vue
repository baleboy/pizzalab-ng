<template>
  <div class="pizzalab">
    <h1>PizzaLab</h1>
    <div v-show="!showEditor">
    <ul>
      <li v-for="dough in doughList" v-on:click="editDough(dough)">
        {{dough.doughName}}
      </li>
    </ul>
    <button v-on:click="addDough">Add Dough</button>
  </div>
    <DoughEditor v-bind:dough="doughInEditor" v-show="showEditor" v-on:confirmed="doughEdited" v-on:cancelled="editCancelled"/>
  </div>
</template>

<script>
import DoughEditor from './DoughEditor'
import Dough from './dough.js'

export default {
  name: 'PizzaLab',
  components: {
    DoughEditor
  },
  data: function () {
    return {
      adding: false,
      editing: false,
      draftDough: new Dough(),
      doughInEditor: new Dough(),
      doughList: [
        new Dough('Dough 1'),
        new Dough('Dough 2'),
        new Dough('Dough 3')
      ]
    }
  },
  computed: {
    showEditor: function () { return this.editing || this.adding }
  },
  methods: {
    addDough: function () {
      this.doughInEditor = this.draftDough
      this.adding = true
    },
    doughEdited: function () {
      if (this.adding) {
        this.doughList.push(this.doughInEditor)
        this.adding = false
      } else {
        this.editing = false
      }
    },
    editCancelled: function () {
      this.editing = false
      this.adding = false
    },
    editDough: function (dough) {
      this.doughInEditor = dough
      this.editing = true
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
