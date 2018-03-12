<template>
  <card>
    <h2>{{dough.doughName}}</h2>
    <p>{{dough.hydration}}% hydration</p>
    <p class="date">Created: {{createdTime}}</p>
  </card>
</template>

<script>
import Card from './Card'

export default {
  name: 'dough-card',

  components: {
    Card
  },

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
