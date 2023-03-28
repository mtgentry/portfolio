<!-- Please remove this file from your project -->
<template lang="pug">
  div.item(data-aos="fade-up")
    nuxt-link(:to="`/project/${project.name}`")
      Media(:project_name="project.name" :media="project.cover.media")
      div.pt-3.title {{ project.cover.title }}
      div.categories {{ project.cover.categories }}

</template>

<script>
import Media from "@/components/Media.vue";

export default {
  props: ['project'],
  components: {
    Media,
  }

}
</script>

<style lang="sass" scoped>

img
  min-height: 500px

  &.large
    width: 100%
  &.small
    width: 60%


.title
  font-weight: 500
  font-size: 19px
  line-height: 25px


.categories
  font-size: 16px
  line-height: 21px

</style>