<template>
  <div contenteditable="true"
  @blur="$emit('edited',
  $event.target.innerText)">
  </div>
</template>

<script>

export default {
  name: 'editable',
  props: ['content'],
  mounted: function () {
    this.$el.innerText = this.content
  },
  watch: {
    content: function () {
      this.$el.innerText = this.content
    }
  }
}
</script>

<style>
div[contenteditable] {
  margin: 1px;
  padding: 1px;
}

div[contenteditable]:hover {
  margin: 0px;
  border: 1px dashed #ccc;
}
</style>
