<!-- Please remove this file from your project -->
<template lang="pug">
  v-row(v-if="textBox.title")
    v-col
      v-card.textBox(flat)
        v-card-text.pa-0
          p.textBoxTitle(v-html="textBox.title")
          p.textBoxText(v-html="textBox.text")
</template>

<script>
export default {
  props: ['textBox'],
}
</script>

<style lang="sass" scoped>
.textBox
  padding: 50px
  background-color: unset
  border: 1px solid #ffffff

  .textBoxTitle
    color: #ffffff
    font-family: Work Sans, serif
    font-size: 25px
    font-style: normal
    font-weight: 600
    line-height: 120%

  .textBoxText
    font-family: Work Sans, serif
    font-size: 20px
    font-style: normal
    font-weight: 300
    line-height: 124.5%

.col
  padding: 0 0 50px 0 !important
</style>
