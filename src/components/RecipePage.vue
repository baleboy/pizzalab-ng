<template>
  <div>
    <h2>{{dough.doughName}}</h2>
    <p>{{dough.description}}</p>
    <p>{{dough.pizzas}} pizzas</p>
    <p>{{dough.hydration}}% hydration</p>
    <p>Flour: {{dough.flour()}}g</p>
    <p>Water: {{dough.water()}}g</p>
    <p>Salt: {{dough.salt()}}g</p>
    <p>Yeast: {{dough.yeast()}}g</p>
    <h3>Steps</h3>
    <pre>{{dough.steps}}</pre>
    <button v-on:click="edit">Edit</button>
    <button v-on:click="close">Close</button>
  </div>
</template>

<script>

export default {
  name: 'recipe-page',

  methods: {
    close: function () {
      this.$emit('close')
    },
    edit: function () {
      this.$emit('edit')
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
