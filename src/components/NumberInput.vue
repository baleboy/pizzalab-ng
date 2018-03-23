<template>
  <input type="number" ref="numberInput" :value="value"
  @keydown="validate" @input="updateValue()" @blur="checkForNull">
</template>

<script>

export default {
  name: 'number-input',
  props: {
    'value': null
  },
  methods: {
    validate: function (event) {
      console.log('keyCode: ' + event.keyCode)
      console.log('key: ' + event.key)
      if (((event.keyCode < 48) || (event.keyCode > 57)) &&
        !((event.key === 'Enter') || (event.key === 'Backspace') ||
          (event.key === 'ArrowLeft') || (event.key === 'ArrowRight'))) {
        event.preventDefault()
      }
    },
    updateValue: function () {
      this.$emit('input', this.$refs.numberInput.value)
    },
    checkForNull: function () {
      if (!this.$refs.numberInput.value) {
        this.$refs.numberInput.value = 0
      }
    }
  }
}
</script>

<style>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0; }
</style>
