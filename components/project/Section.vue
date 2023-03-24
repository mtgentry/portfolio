<!-- Please remove this file from your project -->
<template lang="pug">
  div.section(v-if="section.title")
    span.font-weight-bold(v-if="section.title") {{ section.title }}
    p(v-for="text in section.text") {{ text }}
  v-row.section.images(v-else)
    v-col(v-for="image in section.images" :cols="12 / section.images.length")
      img(:src="`/projects/${$route.params.project}/${image.name}`")


</template>

<script>
export default {
  props: ['section'],

}
</script>

<style lang="sass" scoped>

.section
  padding: 130px 163px 0 163px
  color: #282725

.images
  display: flex
  align-items: center
  justify-content: center

  img
    width: 100%


</style>