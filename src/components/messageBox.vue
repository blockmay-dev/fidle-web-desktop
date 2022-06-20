<template>
  <div class="textarea-emoji-picker">
    <textarea
      ref="textarea"
      class="textarea"
      :value="value"
      @input="$emit('input', $event.target.value)"
    ></textarea>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  }
}
</script>