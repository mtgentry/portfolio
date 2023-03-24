<!-- Please remove this file from your project -->
<template lang="pug">
  div.item
    nuxt-link(:to="`/project/${project_name}`")
      img(:src="`projects/${project_name}/media/${project.image}`" class="large")
      div.title {{ project.title }}
      div.description {{ project.description }}

</template>

<script>
export default {
  props: ['project', 'project_name'],
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