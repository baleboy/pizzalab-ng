<template>
  <div>
    <h2>{{dough.doughName}}</h2>
    <p>{{dough.description}}</p>
    <p>{{dough.hydration}}% hydration</p>
    <div class="pizzas">
      <h2>Pizzas</h2>
      <input type="number" v-model.number="dough.pizzas">
    </div>
    <p>Flour: {{dough.flour()}}g</p>
    <p>Water: {{dough.water()}}g</p>
    <p>Salt: {{dough.salt()}}g</p>
    <p>Yeast: {{dough.yeast()}}g</p>
    <div v-if="dough.prefermentPrc > 0">
      <h3>Starter</h3>
      <p>Flour: {{dough.prefermentFlour()}}g</p>
      <p>Water: {{dough.prefermentWater()}}g</p>
      <p>Yeast: {{dough.prefermentYeast()}}g</p>
    </div>
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

.pizzas {
  text-align: center;
  padding: 1em;
  margin-bottom: 2em; }
  .pizzas input {
    font-size: 3em;
    background: none;
    width: 2em;
    text-align: center; }
  .pizzas h2 {
    font-size: 1em; }

</style>
