<!-- Please remove this file from your project -->
<template lang="pug">
  div.credits
    div.credit(v-if="credit.text" v-for="credit in credits"  :key="credit.name")
      p.mb-0.header(v-html="credit.header")
      p.mb-0.text(v-html="credit.text")
</template>

<script>
export default {
  props: ['credits'],
}
</script>

<style lang="sass" scoped>
.credits
  justify-content: space-between
  display: flex

.credit
  max-width: 200px
  padding: 0 10px

.header
  font-weight: 600
  font-size: 16px
  line-height: 160%

.text
  font-weight: 500
  font-size: 16px
  line-height: 160%


</style>
