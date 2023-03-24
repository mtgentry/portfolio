<!-- Please remove this file from your project -->
<template lang="pug">
  div.item
    nuxt-link(:to="`/project/${project.name}`")
      img(:src="`projects/${project.name}/media/${project.cover.image}`" class="large")
      div.title {{ project.cover.title }}
      div.description {{ project.cover.description }}

</template>

<script>
export default {
  props: ['project'],
}
</script>

<style lang="sass" scoped>

img
  &.large
    width: 100%
  &.small
    width: 60%

.title
  font-weight: 500
  font-size: 19px
  line-height: 25px


.description
  font-size: 16px
  line-height: 21px

</style>