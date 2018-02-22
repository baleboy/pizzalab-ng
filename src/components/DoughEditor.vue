<template>
  <div>
    <p>Name: <input type="text" v-model="dough.doughName"></p>
    <p>Description:</p>
    <textarea v-model="dough.description"></textarea>
    <p>Pizzas: <input type="number" v-model.number="dough.pizzas"></p>
    <p>Hydration: <input type="number" v-model.number="dough.hydration"></p>
    <p>Yeast: <input type="number" step="0.1" v-model.number="dough.yeastPrc">%</p>
    <p>Salt:  <input type="number" step="0.1" v-model.number="dough.saltPrc">%</p>
    <p>Starter: <input type="number" step="any" v-model.number="dough.prefermentPrc">%</p>
    <div v-if="dough.prefermentPrc > 0">
      <p>Starter hydration: <input type="number" step="any" v-model.number.lazy="dough.prefermentHydration">%</p>
      <p>Starter yeast: <input type="number" step="any" v-model.number.lazy="dough.prefermentYeastPrc">%</p>
    </div>
    <p>Steps:</p>
    <textarea v-model="dough.steps"></textarea>
    <p>Flour: {{dough.flour()}}</p>
    <p>Water: {{dough.water()}}</p>
    <p>Salt: {{dough.salt()}}</p>
    <p>Yeast: {{dough.yeast()}}</p>
    <button v-on:click="save">Save</button>
    <button v-on:click="deleteDough">Delete</button>
    <button v-on:click="cancel">Cancel</button>
  </div>
</template>

<script>

export default {
  name: 'dough-editor',

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
  },

  props: [ 'dough' ]
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
