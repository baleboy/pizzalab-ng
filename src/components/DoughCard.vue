<template>
  <div>
    <h2>{{dough.doughName}}</h2>
    <p>{{dough.description}}</p>
    <p>{{dough.hydration}}% hydration</p>
  </div>
</template>

<script>

export default {
  name: 'dough-card',

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
