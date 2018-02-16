<template>
  <div>
    <p>Name: <input type="text" v-model="dough.doughName"></p>
    <p>Description: <input type="textarea" v-model="dough.description"></p>
    <p>Pizzas: <input type="number" v-model.number="dough.pizzas"></p>
    <p>Hydration: <input type="number" v-model.number="dough.hydration"></p>
    <p>Flour: {{dough.flour()}}</p>
    <p>Water: {{dough.water()}}</p>
    <p>Salt: {{dough.salt()}}</p>
    <p>Yeast: {{dough.yeast()}}</p>
    <button v-on:click="save">Save</button>
    <button v-on:click="cancel">Cancel</button>
  </div>
</template>

<script>

export default {
  name: 'DoughEditor',

  methods: {
    save: function () {
      this.$emit('confirmed')
    },
    cancel: function () {
      this.$emit('cancelled')
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
