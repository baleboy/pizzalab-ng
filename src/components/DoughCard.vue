<template>
  <div class="card">
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
  margin-bottom: 0.5em;
}

a {
  color: #42b983;
}

.card {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  margin: auto;
  margin-top: 2em;
  margin-bottom: 2em;
  padding-top: 1em;
  width: 210px; 
  height: 250px;}

p {
  margin-bottom: 0.2em;
}
.card:hover {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
}

</style>
