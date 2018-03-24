<template>
  <input type="number" ref="numberInput" step="any" :value="value"
  @keydown="validate" @input="updateValue()" @blur="checkForNull">
</template>

<script>

const intregexp = new RegExp('^[0-9]+$')
const decregexp = new RegExp('^[0-9]*[\\,\\.]?[0-9]*$')

export default {
  name: 'number-input',
  props: {
    'value': null,
    'decimal': true
  },
  methods: {
    validate: function (event) {
      console.log('keyCode: ' + event.keyCode)
      console.log('key: ' + event.key)
      let r = this.decimal ? decregexp : intregexp
      if ((event.key !== 'Enter') && (event.key !== 'Backspace') &&
        (event.key != 'ArrowLeft') && (event.key !== 'ArrowRight')) {
        let newString = this.$refs.numberInput.value + event.key
        console.log(newString + ' ' + r.test(newString))
        if (!r.test(newString)) {
          event.preventDefault()
        }
      }
    },
    updateValue: function () {
      console.log(this.$refs.numberInput.value)
      console.log(parseFloat(this.$refs.numberInput.value))
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
