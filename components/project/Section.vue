<!-- Please remove this file from your project -->
<template lang="pug">
  div
    span.font-weight-bold(v-if="section.title") {{ section.title }}
    p(v-for="text in section.text") {{ text }}


</template>

<script>
export default {
  props: ['section'],

}
</script>

<style lang="sass" scoped>

div
  padding: 130px 163px
  color: #282725

</style>