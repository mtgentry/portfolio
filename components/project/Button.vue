<!-- Please remove this file from your project -->
<template lang="pug">
  v-row
    v-col
      v-btn#button(:href="button.link") {{ button.text }}
</template>

<script>
export default {
  props: ['button'],
}
</script>

<style lang="sass" scoped>
#button
  background-color: #2805FF
  color: white
  border-radius: 30px
  height: 60px
  width: 260px
  font-weight: 400
  font-size: 23px
  line-height: 30px
  text-transform: capitalize
  letter-spacing: unset
</style>
