<template>
  <div>
    <div class="toolbar">
      <button class="toolbutton" v-on:click="save">Save</button>
      <button class="toolbutton" v-on:click="close">Close</button>
    </div>
    <div class="content">
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
    </div>  
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
