<template>
  <div>
    <h1>{{dough.doughName}}</h1>
    <p>{{dough.hydration}}% hydration</p>
    <div class="pizzas">
      <h2>Pizzas</h2>
      <input type="number" v-model.number="dough.pizzas">
    </div>
    <h2>Ingredients</h2>
      <div class="ingredients item-wrapper">
        <div class="ingredient item">
          <h2>Flour</h2>
          <p>{{dough.flour() - dough.prefermentFlour() }}g</p>
        </div>
        <div class="ingredient item">
          <h2>Water</h2>
          <p>{{dough.water() - dough.prefermentWater()}}g</p>
        </div>
        <div class="ingredient item">
          <h2>Salt</h2>
          <p>{{dough.salt()}}g</p>
        </div>
        <div class="ingredient item">
          <h2>Yeast</h2>
          <p>{{dough.yeast() - dough.prefermentYeast()}}g</p>
        </div>
      </div>
      <div v-if="dough.prefermentPrc > 0" class="ingredients item-wrapper">
        <div class="ingredient item">
          <h2>Starter flour</h2>
          <p>{{dough.prefermentFlour()}}g</p>
        </div>
        <div class="ingredient item">
          <h2>Starter water</h2>
          <p>{{dough.prefermentWater()}}g</p>
        </div>
        <div class="ingredient item">
          <h2>Starter yeast</h2>
          <p>{{dough.prefermentYeast()}}g</p>
        </div>
      </div>
    <div class="instructions">
      <h2>Instructions</h2>
      <p>{{dough.steps}}</p>
    </div>
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

  props: [ 'dough' ],

  computed: {
    instructions: function () {
      return this.dough.steps.replace(/\r?\n/g, '<br>')
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

.item-wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
  margin: auto;
  margin-bottom: 2em;
  max-width: 650px; }

.item {
  -webkit-box-flex: 1;
      -ms-flex-positive: 1;
          flex-grow: 1;
  text-align: center;
  min-width: 150px;
  padding: 1em; }

.ingredient p {
  font-size: 2em;
  margin: 0; }

.ingredient h2 {
  font-size: 0.8em;
  margin-top: 0;
  margin-bottom: 0.5em;
  color: #777777; }

.instructions {
  max-width: 550px;
  margin: auto;
}
.instructions p {
  white-space: pre-wrap;
  text-align: justify;
}

@media (max-width: 660px) {
  .item-wrapper {
    max-width: 400px;
  }
  .instructions {
    max-width: 300px;
  }
}
</style>
