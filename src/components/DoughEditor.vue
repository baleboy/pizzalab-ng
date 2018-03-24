<template>
  <div>
    <div class="toolbar">
      <button class="toolbutton" v-on:click="save">Save</button>
      <button class="closebutton" v-on:click="close">Close</button>
    </div>
    <div class="content">
      <p>Name: <input type="text" v-model="dough.doughName"></p>
      <p>Pizzas: <number-input v-model="dough.pizzas"></number-input></p>
      <p>Weight per pizza:
        <number-input v-model="dough.weightPerPizza"></number-input>g
        <span class="note">(Total dough {{dough.pizzas * dough.weightPerPizza}}g)</span>
      </p>
      <p>Hydration:
        <number-input v-model="dough.hydration"></number-input>%
        <span class="note">(Flour {{dough.flour()}}g, water {{dough.water()}}g)</span>
      </p>
      <p>Yeast:
        <input type="number" step="0.1" v-model.number="dough.yeastPrc">%
        <span class="note">({{dough.yeast()}}g)</span>
      </p>
      <p>Salt:
        <input type="number" step="0.1" v-model.number="dough.saltPrc">%
        <span class="note">({{dough.salt()}}g)</span>
      </p>
      <p>Starter: <number-input v-model="dough.prefermentPrc"></number-input>%</p>
      <div v-if="dough.prefermentPrc > 0">
        <p>Starter hydration:
          <input type="number" step="any" v-model.number.lazy="dough.prefermentHydration">%
          <span class="note">(Flour {{dough.prefermentFlour()}}g, water {{dough.prefermentWater()}}g)</span>
        </p>
        <p>Starter yeast:
          <input type="number" step="any" v-model.number.lazy="dough.prefermentYeastPrc">%
          <span class="note">({{dough.prefermentYeast()}}g)</span>
        </p>
      </div>
      <h2>Instructions:</h2>
      <textarea v-model="dough.steps" placeholder="Enter steps here"></textarea>
    </div>
  </div>
</template>

<script>

import NumberInput from './NumberInput'

export default {
  name: 'dough-editor',

  components: {
    NumberInput
  },

  methods: {
    save: function () {
      this.$emit('save')
    },
    deleteDough: function () {
      this.$emit('delete')
    },
    close: function () {
      this.$emit('close')
    }
  },

  props: [ 'dough' ]
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
  width: 2.5em;
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
  border: none;
  background-color: #fafafa
}

.note {
  color: #888888;
}

@media (max-width: 660px) {
  textarea {
    width: 300px;
  }
}
</style>
