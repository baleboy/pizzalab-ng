<template>
  <div class="card">
    <h2>{{dough.doughName}}</h2>
    <p>{{dough.hydration}}% hydration</p>
    <p class="date">Created: {{createdTime}}</p>
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

  props: [ 'dough' ],

  computed: {
    createdTime: function () {
      let dt = new Date(this.dough.timeCreated)
      return dt.toLocaleString()
    }
  }
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
  padding: 1em;
  width: 210px;
  height: 250px;}

p {
  margin-bottom: 0.2em;
  color: gray;
}
.card:hover {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
}

.date {
  font-size: 0.8em;
}

</style>
